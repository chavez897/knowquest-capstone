from rest_framework import serializers
from books.models.books_ratings import BooksRatings


class BooksRatingsModelSerializer(serializers.ModelSerializer):
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
        )
