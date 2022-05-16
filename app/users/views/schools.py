from rest_framework import mixins, viewsets

from users.models.schools import Schools
from users.serializers.schools import SchoolsModelSerializer


class SchoolsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Schools.objects.all()
    serializer_class = SchoolsModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

