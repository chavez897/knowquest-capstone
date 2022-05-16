from rest_framework import serializers
from users.models.schools import Schools


class SchoolsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schools
        fields = (
            "id",
            "name",
        )


