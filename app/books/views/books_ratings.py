from re import A
from rest_framework import mixins, status, viewsets, filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Avg, Case, When
from django.http import Http404

from users.permissions.users import IsStudent, IsFacultyMember, IsAccountOwner, IsAdmin

from books.models.books_ratings import BooksRatings
from books.serializers.books_ratings import BooksRatingsModelSerializer, SearchBookRatingsSerializer, DetailBookRatingsSerializer, CommentsBookRatingsSerializer


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

    filter_fields = ["level", "subject", "book_id"]
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
        elif self.action in ["book"]:
            return BooksRatings.objects.all().select_related("book").values("book__id", "book__image", "book__title", "book__description", "book__authors", "book__publish_date",
                                                                            ).annotate(Count("id"), Avg("overall"), Avg("appropriateness"), Avg("efectiveness"), Avg("value"), Avg("visual_aids"),
                                                                                       has_manual_count=Count(Case(When(instructor_manual_provided=True, then=1))), has_slides_count=Count(Case(When(teaching_slides_provided=True, then=1))),
                                                                                       has_question_bank_count=Count(Case(When(question_bank_provided=True, then=1))), has_digital_resource_count=Count(Case(When(digital_resource_provided=True, then=1))),
                                                                                       has_assigments_count=Count(Case(When(assigments_provided=True, then=1))))
        elif self.action in ["comments"]:
            return BooksRatings.objects.filter(comments__isnull=False).exclude(comments__exact="").values("comments", "id")
        return BooksRatings.objects.all().select_related("subject", "level", "cost", "semester", "book")
        

    def get_serializer_class(self):
        if self.action in ["search"]:
            return SearchBookRatingsSerializer
        elif self.action in ["book"]:
            return DetailBookRatingsSerializer
        elif self.action in ["comments"]:
            return CommentsBookRatingsSerializer
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
        for book in queryset:
            book["has_manual"] = book["has_manual_count"] > book["id__count"]/2
            book["has_question_bank"] = book["has_question_bank_count"] > book["id__count"]/2
            book["has_slides"] = book["has_slides_count"] > book["id__count"]/2
            book["has_assigments"] = book["has_assigments_count"] > book["id__count"]/2
            book["has_digital_resource"] = book["has_digital_resource_count"] > book["id__count"]/2
        if len(queryset) == 0:
            raise Http404()
        serializer = self.get_serializer(queryset[0])
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def comments(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
