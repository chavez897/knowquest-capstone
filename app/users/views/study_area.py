from rest_framework import mixins, viewsets

from users.models.study_area import StudyArea
from users.serializers.study_area import StudyAreaModelSerializer


class StudyAreaViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = StudyArea.objects.all()
    serializer_class = StudyAreaModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

