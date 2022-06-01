from rest_framework import serializers
from books.models.books_ratings import BooksRatings
from users.serializers.study_area import StudyAreaModelSerializer
from ratings_catalogs.serializers.level import LevelModelSerializer
from ratings_catalogs.serializers.cost import CostModelSerializer
from ratings_catalogs.serializers.semester import SemesterModelSerializer
from books.serializers.books import BooksModelSerializer



class BooksRatingsModelSerializer(serializers.ModelSerializer):
    subject_info = StudyAreaModelSerializer(read_only=True, source='subject')
    level_info = LevelModelSerializer(read_only=True, source='school')
    cost_info = CostModelSerializer(read_only=True, source='cost')
    semester_info = SemesterModelSerializer(read_only=True, source='semester')
    book_info = BooksModelSerializer(read_only=True, source='book')
    class Meta:
        model = BooksRatings
        fields = (
            "id",
            "book",
            "appropriateness",
            "efectiveness",
            "value",
            "visual_aids",
            "overall",
            "recommend",
            "instructor_manual_provided",
            "teaching_slides_provided",
            "question_bank_provided",
            "digital_resource_provided",
            "assigments_provided",
            "instructor_manual_used",
            "teaching_slides_used",
            "question_bank_used",
            "digital_resource_used",
            "assigments_used",
            "use_again",
            "comments",
            "user",
            "subject",
            "level",
            "cost",
            "year",
            "semester",
            "subject_info",
            "level_info",
            "cost_info",
            "semester_info",
            "book_info",
        )
    


class SearchBookRatingsSerializer(serializers.Serializer):
    book_id = serializers.IntegerField(required=True, source='book__id')
    book_image = serializers.CharField(required=True, source='book__image')
    book_title = serializers.CharField(required=True, source='book__title')
    book_description = serializers.CharField(required=True, source='book__description')
    total = serializers.IntegerField(required=True, source='id__count')
    rate_average = serializers.FloatField(required=True, source='overall__avg')



class DetailBookRatingsSerializer(serializers.Serializer):
    book_id = serializers.IntegerField(required=True, source='book__id')
    book_image = serializers.CharField(required=True, source='book__image')
    book_title = serializers.CharField(required=True, source='book__title')
    book_description = serializers.CharField(required=True, source='book__description')
    book_authors = serializers.CharField(required=True, source='book__authors')
    total = serializers.IntegerField(required=True, source='id__count')
    overall_average = serializers.FloatField(required=True, source='overall__avg')
    appropriateness_average = serializers.FloatField(required=True, source='appropriateness__avg')
    efectiveness_average = serializers.FloatField(required=True, source='efectiveness__avg')
    value_average = serializers.FloatField(required=True, source='value__avg')
    visual_aids_average = serializers.FloatField(required=True, source='visual_aids__avg')
    has_manual = serializers.BooleanField(required=True)
    has_question_bank = serializers.BooleanField(required=True)
    has_slides = serializers.BooleanField(required=True)
    has_assigments = serializers.BooleanField(required=True)
    has_digital_resource = serializers.BooleanField(required=True)