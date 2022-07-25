from datetime import timedelta

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import (
    authenticate,
    password_validation,
    user_logged_in,
)
from django.db import transaction
from django.utils import timezone
from django.template.loader import render_to_string
from django.contrib.sites.models import Site
from users.models.academic_domains import AcademicDomains
from users.models.study_area import StudyArea
from users.models.roles import UserRole
from users.models.schools import Schools

import jwt
from rest_framework import exceptions, serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt import settings as jwt_settings
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken


from users.models import (
    User
)


class UserLoginTokenPairSerializer(TokenObtainSerializer):
    """"""

    # noinspection PyMethodMayBeStatic
    def get_view_token(self, user, request):
        token = RefreshToken.for_user(user)
        # Agrega custom claims
        token["id"] = user.id
        token["username"] = user.username

        # Registra el acceso
        user_logged_in.send(sender=user.__class__, request=request, user=user)

        return token

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }

        request = self.context["request"]

        user = authenticate(request=request, **authenticate_kwargs)

        if user is None:
            raise exceptions.AuthenticationFailed("Incorrect Credentials")

        if not user.is_active or not user.is_verified:
            raise exceptions.AuthenticationFailed(
                "User has not verified the account"
            )
        refresh = self.get_view_token(user, request)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


class PasswordRecoveryEmail(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, data):
        """if the email has an associated account send the recovery email."""
        email = data["email"]
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"Error": "Invalid User"})
        exp_date = timezone.now() + timedelta(days=settings.JWT_TOKEN_EXP_DAYS)
        user = User.objects.get(email=email)
        payload = {
            "jti": jwt_settings.api_settings.JTI_CLAIM,
            "user": user.username,
            "exp": int(exp_date.timestamp()),
            "token_type": "password_recovery",
        }
        host = Site.objects.get(id=1)
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        content = render_to_string(
            "recover_password.html",
            {
                "url": "{}/auth/reset-password?token={}".format(host, token),
            },
        )
        msg = EmailMultiAlternatives(
           subject="Forgot Password",
            body=content,
            from_email="Knowquest <knowquest@gmail.com>",
            to=[email],
        )
        msg.attach_alternative(content, "text/html")
        msg.send()
        return data


class PasswordRecovery(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=64, required=True)
    password_confirmation = serializers.CharField(
        min_length=8, max_length=64, required=True
    )
    token = serializers.CharField(required=True)

    def validate_token(self, data):
        """Verify token is valid."""
        try:
            payload = jwt.decode(data, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError("Link expired")
        except jwt.exceptions.PyJWTError:
            raise serializers.ValidationError("Invalid Token")

        if payload["token_type"] != "password_recovery":
            raise serializers.ValidationError({"token_type": "Invalid Token"})

        self.context["payload"] = payload

        return data

    def validate(self, data):
        """Verifies passwords match."""
        password = data["password"]
        password_confirmation = data["password_confirmation"]
        token = data["token"]

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Passwords does not match"}
            )

        # Password valid or raise exception
        password_validation.validate_password(password)
        self.validate_token(token)

        # Validate if exists the user
        try:
            User.objects.get(username=self.context["payload"]["user"])
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": "Invalid User"})

        return data

    def save(self):
        user = User.objects.get(username=self.context["payload"]["user"])
        user.set_password(self.validated_data["password"])
        user.save()

        return user


class UserSignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())], required=True
    )
    username = serializers.CharField(
        min_length=4,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())],
        required=True,
    )
    password = serializers.CharField(min_length=8, max_length=64, required=True)
    password_confirmation = serializers.CharField(
        min_length=8, max_length=64, required=True
    )
    role = serializers.CharField(min_length=1, max_length=64, required=True)
    school = serializers.IntegerField(allow_null=True)
    study_area = serializers.IntegerField(allow_null=True)

    def validate(self, data):
        password = data["password"]
        password_confirmation = data["password_confirmation"]

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Las contraseñas no coinciden"}
            )
        
        if not UserRole.objects.filter(role=data["role"]).exists():
            raise serializers.ValidationError({"Error": "Invalid Role"})

        if data["school"] is not None and not Schools.objects.filter(id=data["school"]).exists():
            raise serializers.ValidationError({"Error": "Invalid School"})
        
        if data["study_area"] is not None and not StudyArea.objects.filter(id=data["study_area"]).exists():
            raise serializers.ValidationError({"Error": "Invalid Study Area"})

        if data["role"] in ["faculty member", "student"]:
            if data["study_area"] is None:
                raise serializers.ValidationError({"Error": "Invalid Study Area"})
            if data["school"] is None:
                raise serializers.ValidationError({"Error": "Invalid School"})
            email_domain = data["email"].split("@")[1]
            if not AcademicDomains.objects.filter(domain=email_domain):
                raise serializers.ValidationError(
                    {"email": "domain error"}
                )

        # Password valid or raise exception
        password_validation.validate_password(password)

        return data

    def create(self, data):
        """Handle user and profile creation"""
        data.pop("password_confirmation")
        role = data.pop("role")
        school = data.pop("school")
        area = data.pop("study_area")
        user = User.objects.create_user(
            role_id = role,
            school_id = school,
            study_area_id = area,
            **data
        )
        exp_date = timezone.now() + timedelta(days=settings.JWT_TOKEN_EXP_DAYS)
        payload = {
            "user": user.username,
            "exp": int(exp_date.timestamp()),
            "token_type": "email_confirmation",
        }
        host = Site.objects.get(id=1)
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        content = render_to_string(
            "account_verification.html",
            {
                "url": "{}/auth/login?token={}".format(host, token),
            },
        )
        msg = EmailMultiAlternatives(
            subject="Email Verifaction",
            body=content, 
            from_email="Knowquest <knowquest@gmail.com>",
            to=[user.email],
        )
        msg.attach_alternative(content, "text/html")
        msg.send()

        return user


class AccountVerificationSerializer(serializers.Serializer):
    """Account verification serializer."""

    token = serializers.CharField()

    def validate_token(self, data):
        """Verify token is valid."""
        try:
            payload = jwt.decode(data, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError("Link has expired")
        except jwt.exceptions.PyJWTError:
            raise serializers.ValidationError("Invalid Token")

        if payload["token_type"] != "email_confirmation":
            raise serializers.ValidationError({"token_type": "Invalid Token"})

        self.context["payload"] = payload

        return data

    def save(self, **kwargs):
        payload = self.context["payload"]
        request = self.context.get("request")
        user = User.objects.get(username=payload["user"])
        user.is_verified = True
        user.is_active = True
        user.save()


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

