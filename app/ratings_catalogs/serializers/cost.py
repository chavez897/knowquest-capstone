from rest_framework import serializers
from ratings_catalogs.models.cost import Cost


class CostModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = (
            "id",
            "name",
        )


