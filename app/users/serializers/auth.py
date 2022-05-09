from datetime import timedelta

from django.conf import settings
from django.contrib.auth import (
    authenticate,
    password_validation,
    user_logged_in,
)
from django.db import transaction
from django.utils import timezone

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
                "La cuenta no ha sido activada o verificada aún"
            )
        refresh = self.get_view_token(user, request)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


class PasswordRecoveryEmail(serializers.Serializer):
    email = serializers.EmailField(required=True)

    @staticmethod
    def gen_verification_token(user):
        """Create JWT token that the user can use to verify its account."""
        exp_date = timezone.now() + timedelta(days=settings.JWT_TOKEN_EXP_DAYS)
        payload = {
            "jti": jwt_settings.api_settings.JTI_CLAIM,
            "user": user.username,
            "exp": int(exp_date.timestamp()),
            "token_type": "password_recovery",
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        return token

    def validate(self, data):
        """if the email has an associated account send the recovery email."""
        email = data["email"]
        user = User.objects.filter(email=email)
        if not user.exists():
            raise serializers.ValidationError({"Error": "El Usuario no existe"})
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
            raise serializers.ValidationError("Link de verificación ha expirado")
        except jwt.exceptions.PyJWTError:
            raise serializers.ValidationError("Token inválido")

        if payload["token_type"] != "password_recovery":
            raise serializers.ValidationError({"token_type": "Token inválido"})

        self.context["payload"] = payload

        return data

    def validate(self, data):
        """Verifies passwords match."""
        password = data["password"]
        password_confirmation = data["password_confirmation"]
        token = data["token"]

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Las contraseñas no coinciden"}
            )

        # Password valid or raise exception
        password_validation.validate_password(password)
        self.validate_token(token)

        # Validate if exists the user
        try:
            User.objects.get(username=self.context["payload"]["user"])
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": "Usuario no encontrado"})

        return data

    def save(self):
        user = User.objects.get(username=self.context["payload"]["user"])
        user.set_password(self.validated_data["password"])
        user.save()

        return user


class UserSignUpSerializer(serializers.Serializer):
    """User signup serializer.
    Clase para controlar el registro de usuaruos del admin de Cohua shop.
    """

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

    def validate(self, data):
        """Validación de contraseña."""
        password = data["password"]
        password_confirmation = data["password_confirmation"]

        if password != password_confirmation:
            raise serializers.ValidationError(
                {"password_confirmation": "Las contraseñas no coinciden"}
            )
        
        if "gmail.com" in data["email"]:
            raise serializers.ValidationError(
                {"email": "domain error"}
            )

        # Password valid or raise exception
        password_validation.validate_password(password)

        return data

    def create(self, data):
        """Handle user and profile creation"""
        data.pop("password_confirmation")
        user = User.objects.create_user(**data)
        # Registra el registro

        return user


class AccountVerificationSerializer(serializers.Serializer):
    """Account verification serializer."""

    token = serializers.CharField()

    def validate_token(self, data):
        """Verify token is valid."""
        try:
            payload = jwt.decode(data, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError("Link de verificación ha expirado")
        except jwt.exceptions.PyJWTError:
            raise serializers.ValidationError("Token inválido")

        if payload["token_type"] != "email_confirmation":
            raise serializers.ValidationError({"token_type": "Token inválido"})

        self.context["payload"] = payload

        return data

    def save(self, **kwargs):
        """Update the user's verified active and status."""
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

