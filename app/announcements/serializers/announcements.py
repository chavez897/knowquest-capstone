from rest_framework import serializers
from announcements.models.announcements import Announcement


class AnnouncementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = (
            "id",
            "announcements",
            "date"
        )


