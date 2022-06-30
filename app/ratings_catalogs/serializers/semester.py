from rest_framework import serializers
from ratings_catalogs.models.semester import Semester


class SemesterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = (
            "id",
            "name",
        )


