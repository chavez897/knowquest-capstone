#from winreg import QueryInfoKey
from django.shortcuts import render
from django.http import HttpResponse

# MAIN CODE ONLY here *************************************************

from django.http import Http404

from .models import Resources, ResourcesRatings, MediaType
from .serializers import ResourcesModelSerializer, ResourcesRatingsModelSerializer, SearchResourceRatingsSerializer, DetailResourceRatingsSerializer, CommentsResourceRatingsSerializer, MediaTypeModelSerializer

from re import A
from rest_framework import mixins, status, viewsets, filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Avg, Case, When

from users.permissions.users import IsStudent, IsFacultyMember, IsAccountOwner, IsAdmin


class MediaTypeViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = MediaType.objects.all()
    serializer_class = MediaTypeModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)


class ResourcesViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Resources.objects.all()
    serializer_class = ResourcesModelSerializer

    def get_permissions(self):
        if self.action in ["create"]:
            permissions = [IsAuthenticated, IsAccountOwner,
                           IsStudent | IsFacultyMember | IsAdmin]
        else:
            permissions = []
        return (permission() for permission in permissions)

    def create(self, request, *args, **kwargs):
        if Resources.objects.filter(resource_name=request.data["resource_name"]).exists():
            serializer = self.get_serializer(Resources.objects.get(
                resource_name=request.data["resource_name"]))
            return Response(serializer.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=["GET"])
    def search(self, request):
        resource_name = request.query_params.get('resource_name')
        if not Resources.objects.filter(resource_name=resource_name).exists():
            raise Http404()
        serializer = ResourcesModelSerializer(
            Resources.objects.get(resource_name=resource_name))
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ResourcesRatingsViewSet(
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

    filter_fields = ["level", "subject", "resource_id"]
    search_fields = [
        'resource__title',
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
            return ResourcesRatings.objects.all().select_related("resource").values("resource__id", "resource__title", "resource__media_type").annotate(Count("id"), Avg("overall"))
        elif self.action in ["mine"]:
            return ResourcesRatings.objects.filter(user__id=self.request.user.id).select_related("subject", "level", "semester", "resource")
        elif self.action in ["resource"]:
            return ResourcesRatings.objects.all().select_related("resource").values("resource__id", "resource__title", "resource__media_type__name",
                                                                                    ).annotate(Count("id"), Avg("overall"), Avg("effective"), Avg("relevant"), Avg("easy_use"), Avg("value"), Avg("class_helped"))
        elif self.action in ["comments"]:
            return ResourcesRatings.objects.filter(comments__isnull=False).exclude(comments__exact="").values("comments")
        elif self.action in ["subject"]:
            return ResourcesRatings.objects.all().select_related("subject").values("resource", "subject__name").annotate(Count("id")).order_by("-id")
        elif self.action in ["semester"]:
            return ResourcesRatings.objects.all().select_related("semester").values("resource", "semester__name").annotate(Count("id")).order_by("-id")
        elif self.action in ["year"]:
            return ResourcesRatings.objects.all().values("resource", "year").annotate(Count("id")).order_by("-id")
        return ResourcesRatings.objects.all().select_related("subject", "level", "semester", "resource")

    def get_serializer_class(self):
        if self.action in ["search"]:
            return SearchResourceRatingsSerializer
        elif self.action in ["resource"]:
            return DetailResourceRatingsSerializer
        elif self.action in ["comments"]:
            return CommentsResourceRatingsSerializer
        return ResourcesRatingsModelSerializer

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

# REST_FRAMEWORK API Calls

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
    def resource(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def comments(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def subject(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        max = 0
        subject_name = ""
        for val in queryset:
            if val['id__count'] > max:
                max = val['id__count']
                subject_name = val["subject__name"]
        return Response({
            "subject": subject_name
        })
    

    @action(detail=False, methods=["GET"])
    def semester(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        max = 0
        name = ""
        for val in queryset:
            if val['id__count'] > max:
                max = val['id__count']
                name = val["semester__name"]
        return Response({
            "semester": name
        })
    
    @action(detail=False, methods=["GET"])
    def year(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        max = 0
        name = ""
        for val in queryset:
            if val['id__count'] > max:
                max = val['id__count']
                name = val["year"]
        return Response({
            "year": name
        })
