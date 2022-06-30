from rest_framework import mixins, viewsets

from ratings_catalogs.models.level import Level
from ratings_catalogs.serializers.level import LevelModelSerializer


class LevelViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Level.objects.all()
    serializer_class = LevelModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

