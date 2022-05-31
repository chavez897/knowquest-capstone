from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from users.permissions.users import IsStudent, IsFacultyMember, IsProfileOwner, IsAdmin

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
        if self.action in ["update", "partial_update", "create"]:
            permissions = [IsAuthenticated, IsStudent | IsFacultyMember | IsAdmin]
        else:
            permissions = []
        return (permission() for permission in permissions)


