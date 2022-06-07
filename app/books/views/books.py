import requests
from django.conf import settings
from utils.utils import validateDateFormat
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from rest_framework.permissions import IsAuthenticated

from users.permissions.users import IsStudent, IsFacultyMember, IsAccountOwner, IsAdmin

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
        if self.action in ["create"]:
            permissions = [IsAuthenticated, IsAccountOwner,
                           IsStudent | IsFacultyMember | IsAdmin]
        else:
            permissions = []
        return (permission() for permission in permissions)

    @action(detail=False, methods=["GET"])
    def search(self, request):
        isbn = request.query_params.get('isbn')
        if not Books.objects.filter(isbn=isbn).exists():
            try:
                url = "https://www.googleapis.com/books/v1/volumes?q=isbn:{}&key={}".format(
                    isbn, settings.GOOGLE_BOOKS_API_KEY)
                response = requests.request(
                    "GET", url, headers={}, data={}).json()
                if response["totalItems"] > 0:
                    api_data = response["items"][0]
                    if "volumeInfo" not in api_data:
                        raise Http404()
                    book_info = api_data["volumeInfo"]
                    authors = None
                    if "authors" in book_info:
                        authors = ""
                        for author in book_info["authors"]:
                            authors += "{}".format(author)
                    book = {
                        "isbn": isbn,
                        "image": book_info["imageLinks"]["thumbnail"] if "imageLinks" in book_info and "thumbnail" in book_info["imageLinks"] else None,
                        "title": book_info["title"] if "title" in book_info else None,
                        "description": book_info["description"] if "description" in book_info else None,
                        "publisher": book_info["publisher"] if "publisher" in book_info else None,
                        "authors": authors,
                        "publish_date": book_info["publishedDate"] if "publishedDate" in book_info and validateDateFormat(book_info["publishedDate"]) else None,
                    }
                    serializer = self.get_serializer(data=book)
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as ex:
                print(ex)
                raise Http404()
            else:
                raise Http404()
        serializer = BooksModelSerializer(Books.objects.get(isbn=isbn))
        return Response(status=status.HTTP_200_OK, data=serializer.data)
