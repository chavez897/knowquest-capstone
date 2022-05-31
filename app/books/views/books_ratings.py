from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.permissions.users import IsStudent, IsFacultyMember, IsAccountOwner, IsAdmin

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
            permissions = [IsAuthenticated, IsAccountOwner, IsStudent | IsFacultyMember | IsAdmin]
        else:
            permissions = []
        return (permission() for permission in permissions)
    

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

    def update(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


