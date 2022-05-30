from rest_framework import mixins, viewsets

from books.models.books_ratings import BooksRatings
from books.serializers.books_ratings import BooksRatingsModelSerializer


class BooksRatingsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = BooksRatings.objects.all()
    serializer_class = BooksRatingsModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)


