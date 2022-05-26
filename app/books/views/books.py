from rest_framework import mixins, viewsets

from books.models.books import Books
from books.serializers.books import BooksModelSerializer


class BooksViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Books.objects.all()
    serializer_class = BooksModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

