from rest_framework import serializers
from contests.models.contests import Contests


class ContestsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contests
        fields = (
            "id",
            "logo",
            "name",
            "description"
        )


