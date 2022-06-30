from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend

from users.models import User
from users.serializers.users import UserModelSerializer
from users.permissions.users import IsProfileOwner

class UserViewSet(
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = "username"

    filter_backends = [
        DjangoFilterBackend,
    ]

    filter_fields = [
        "userprofile",
    ]

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [
            IsAuthenticated, IsProfileOwner
        ]
        return (permission() for permission in permissions)

    @action(detail=False, methods=["GET"])
    def me(self, request):
        serializer = UserModelSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
