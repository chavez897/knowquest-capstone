from rest_framework import serializers
from users.models.study_area import StudyArea


class StudyAreaModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyArea
        fields = (
            "id",
            "name",
        )


