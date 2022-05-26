from rest_framework import serializers
from books.models.books import Books


class BooksModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = (
            "id",
            "isbn",
            "image",
            "title",
            "description",
            "publisher",
            "authors",
            "publish_date"
        )


