from rest_framework import mixins, viewsets

from ratings_catalogs.models.cost import Cost
from ratings_catalogs.serializers.cost import CostModelSerializer


class CostViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Cost.objects.all()
    serializer_class = CostModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

