"""User auth views."""
from django.db import transaction
from django.utils.decorators import method_decorator

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from users.serializers.auth import (
    AccountVerificationSerializer,
    ChangePasswordSerializer,
    PasswordRecovery,
    PasswordRecoveryEmail,
    UserLoginTokenPairSerializer,
    UserSignUpSerializer,
)
from users.serializers.users import UserModelSerializer


class UserAuthViewSet(viewsets.GenericViewSet):
    """User authentication API view."""

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ["update_password"]:
            permissions = [
                IsAuthenticated,
            ]
        else:
            permissions = []
        return (permission() for permission in permissions)

    @action(detail=False, methods=["post"], url_path="token/refresh")
    def token_refresh(self, request, *args, **kwargs):
        serializer = TokenRefreshSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            data = {"detail": e.args[0], "code": "token_expired"}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def signup(self, request, *args, **kwargs):
        """Handle HTTP POST request for signup."""
        serializer = UserSignUpSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def verify(self, request, *args, **kwargs):
        """User account verification API view."""
        serializer = AccountVerificationSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {"message": "Felicidades, ahora puedes iniciar sesión"}
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["put"])
    def update_password(self, request, *args, **kwargs):
        """An endpoint for changing password."""
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        # Check old password
        if not user.check_password(serializer.data.get("old_password")):
            return Response(
                {"old_password": ["Contraseña incorrecta."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # set_password also hashes the password that the user will get
        user.set_password(serializer.data.get("new_password"))
        user.save()
        data = {"message": "Felicidades, ahora puedes iniciar sesión"}

        return Response(data, status=status.HTTP_200_OK)


    @action(detail=False, methods=["post"], url_path="recover-password-email")
    def recover_password_email(self, request, *args, **kwargs):
        serializer = PasswordRecoveryEmail(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(detail=False, methods=["post"], url_path="recover-password")
    def recover_password(self, request, *args, **kwargs):
        """An endpoint for changing password."""
        serializer = PasswordRecovery(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_200_OK)


@method_decorator(transaction.non_atomic_requests, name="dispatch")
class UserAuthNonAtomicViewSet(viewsets.GenericViewSet):
    serializer_class = UserLoginTokenPairSerializer

    @action(detail=False, methods=["post"], url_path="token")
    def token(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
