from rest_framework import mixins, viewsets

from announcements.models.announcements import Announcement
from announcements.serializers.announcements import AnnouncementModelSerializer


class AnnouncementsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)
