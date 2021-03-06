# MAIN CODE ONLY here ************************************
from rest_framework import serializers
from resources.models import Resources, ResourcesRatings, MediaType
from users.serializers.study_area import StudyAreaModelSerializer
from ratings_catalogs.serializers.level import LevelModelSerializer
from ratings_catalogs.serializers.semester import SemesterModelSerializer


class MediaTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaType
        fields = '__all__'


class ResourcesModelSerializer(serializers.ModelSerializer):
    media_type_info = MediaTypeModelSerializer(read_only=True, source='media_type')
    class Meta:
        model = Resources
        fields = '__all__'


class ResourcesRatingsModelSerializer(serializers.ModelSerializer):
    subject_info = StudyAreaModelSerializer(read_only=True, source='subject')
    level_info = LevelModelSerializer(read_only=True, source='school')
    semester_info = SemesterModelSerializer(read_only=True, source='semester')
    resource_info = ResourcesModelSerializer(read_only=True, source='resource')

    class Meta:
        model = ResourcesRatings
        fields = '__all__'


class SearchResourceRatingsSerializer(serializers.Serializer):
    resource_id = serializers.IntegerField(
        required=True, source='resource__id')
    resource_title = serializers.CharField(
        required=True, source='resource__title')
    resource_media_type = serializers.CharField(
        required=True, source='resource__media_type')
    total = serializers.IntegerField(required=True, source='id__count')
    rate_average = serializers.FloatField(required=True, source='overall__avg')


class DetailResourceRatingsSerializer(serializers.Serializer):
    resource_id = serializers.IntegerField(
        required=True, source='resource__id')
    resource_title = serializers.CharField(
        required=True, source='resource__title')
    resource_media_type = serializers.CharField(
        required=True, source='resource__media_type__name')
    total = serializers.IntegerField(required=True, source='id__count')
    overall_average = serializers.FloatField(
        required=True, source='overall__avg')
    effective_average = serializers.FloatField(
        required=True, source='effective__avg')
    relevant_average = serializers.FloatField(
        required=True, source='relevant__avg')
    easyUse_average = serializers.FloatField(
        required=True, source='easy_use__avg')
    value_average = serializers.FloatField(required=True, source='value__avg')
    classHelped = serializers.FloatField(
        required=True, source='class_helped__avg')


class CommentsResourceRatingsSerializer(serializers.Serializer):
    comments = serializers.CharField(required=True)
