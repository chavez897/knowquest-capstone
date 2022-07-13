from rest_framework import serializers
from users.models.academic_domains import AcademicDomains


class AcademicDomainsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDomains
        fields = (
            "id",
            "domain",
        )
