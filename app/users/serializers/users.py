from django.contrib.auth import get_user_model

from rest_framework import serializers
from users.serializers.schools import SchoolsModelSerializer
from users.serializers.study_area import StudyAreaModelSerializer

User = get_user_model()



class UserModelSerializer(serializers.ModelSerializer):

    school_info = SchoolsModelSerializer(read_only=True, source='school')
    study_area_info = StudyAreaModelSerializer(read_only=True, source='study_area')

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "is_active",
            "is_verified",
            "role",
            "school",
            "study_area",
            "school_info",
            "study_area_info",
        )
        read_only_fields = ("username",)

    def create(self, validated_date):
        return super(UserModelSerializer, self).create(validated_date)

