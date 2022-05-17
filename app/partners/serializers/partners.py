from rest_framework import serializers
from partners.models.partners import Partners


class PartnersModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = (
            "id",
            "logo",
            "name",
            "offers",
            "description",
            "initial_limited_time",
            "final_limited_time",
            "locations"
        )


