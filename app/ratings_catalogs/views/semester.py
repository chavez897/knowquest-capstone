from rest_framework import mixins, viewsets

from ratings_catalogs.models.semester import Semester
from ratings_catalogs.serializers.semester import SemesterModelSerializer


class SemesterViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Semester.objects.all()
    serializer_class = SemesterModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

