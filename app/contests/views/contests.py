from rest_framework import mixins, viewsets

from contests.models.contests import Contests
from contests.serializers.contests import ContestsModelSerializer


class ContestsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Contests.objects.all()
    serializer_class = ContestsModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

