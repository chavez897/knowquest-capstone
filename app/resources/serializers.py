# MAIN CODE ONLY here ************************************
from rest_framework import serializers
from .models import Resources, ResourcesRatings
from users.serializers.study_area import StudyAreaModelSerializer
from ratings_catalogs.serializers.level import LevelModelSerializer
from ratings_catalogs.serializers.semester import SemesterModelSerializer


class ResourcesModelSerializer(serializers.ModelSerializer):
    class Meta:
        models = Resources
        fields = '__all__'

class ResourcesRatingsModelSerializer(serializers.ModelSerializer):
    subject_info = StudyAreaModelSerializer(read_only=True, source='subject')
    level_info = LevelModelSerializer(read_only=True, source='school')
    semester_info = SemesterModelSerializer(read_only=True, source='semester')
    #book_info = BooksModelSerializer(read_only=True, source='book')
    resource_info = ResourcesModelSerializer(read_only=True, source='resource')
    class Meta:
        models = ResourcesRatings
        fields = '__all__'


class SearchResourceRatingsSerializer(serializers.Serializer):
    resource_id = serializers.IntegerField(required=True, source='resource__id')
    resource_title = serializers.CharField(required=True, source='resource__title')
    resource_media_type = serializers.CharField(required=True, source='resource__mediaType')
    total = serializers.IntegerField(required=True, source='id__count')
    rate_average = serializers.FloatField(required=True, source='overall__avg')


class DetailResourceRatingsSerializer(serializers.Serializer):
    resource_id = serializers.IntegerField(required=True, source='resource__id')
    resource_title = serializers.CharField(required=True, source='resource__title')
    resource_media_type = serializers.CharField(required=True, source='resource__mediaType')
    total = serializers.IntegerField(required=True, source='id__count')
    overall_average = serializers.FloatField(required=True, source='overall__avg')
    effective_average = serializers.FloatField(required=True, source='effective__avg')
    relevant_average = serializers.FloatField(required=True, source='relevant__avg')
    easyUse_average = serializers.FloatField(required=True, source='easyUse__avg')
    value_average = serializers.FloatField(required=True, source='value__avg')
    classHelped = serializers.FloatField(required=True, source='classHelped__avg')
    subject_name = serializers.CharField(required=True, source='subject__name')
    semester_name = serializers.CharField(required=True, source='semester__name')
    year_value = serializers.IntegerField(required=True, source='year__value') 

class CommentsResourceRatingsSerializer(serializers.Serializer):
    comments = serializers.CharField(required=True)

