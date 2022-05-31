from rest_framework import mixins, status, viewsets, filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Avg

from users.permissions.users import IsStudent, IsFacultyMember, IsAccountOwner, IsAdmin

from books.models.books_ratings import BooksRatings
from books.serializers.books_ratings import BooksRatingsModelSerializer, SearchBookRatingsSerializer


class BooksRatingsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
    ]

    filter_fields = ["level", "subject", "book__id"]
    search_fields = [
        'book__title',
    ]

    def get_permissions(self):
        if self.action in ["update", "partial_update", "create", "mine"]:
            permissions = [IsAuthenticated, IsAccountOwner,
                           IsStudent | IsFacultyMember | IsAdmin]
        else:
            permissions = []
        return (permission() for permission in permissions)

    def get_queryset(self):
        if self.action in ["search"]:
            return BooksRatings.objects.all().select_related("book").values("book__id", "book__image", "book__title", "book__description").annotate(Count("id"), Avg("overall"))
        elif self.action in ["mine"]:
            return BooksRatings.objects.filter(user__id=self.request.user.id).select_related("subject", "level", "cost", "semester", "book")
        return BooksRatings.objects.all().select_related("subject", "level", "cost", "semester", "book")

    def get_serializer_class(self):
        if self.action in ["search"]:
            return SearchBookRatingsSerializer
        return BooksRatingsModelSerializer

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
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def search(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=["GET"])
    def mine(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=["GET"])
    def book(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        print(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)