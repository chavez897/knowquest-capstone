from rest_framework import serializers
from ratings_catalogs.models.level import Level


class LevelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            "id",
            "name",
        )


