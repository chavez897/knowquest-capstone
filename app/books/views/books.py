from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404

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

    @action(detail=False, methods=["GET"])
    def search(self, request):
        isbn = request.query_params.get('isbn')
        if not Books.objects.filter(isbn=isbn).exists():
            raise Http404()
        serializer = BooksModelSerializer(Books.objects.get(isbn=isbn))
        return Response(status=status.HTTP_200_OK, data=serializer.data)
