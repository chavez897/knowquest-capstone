from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from users.models.academic_domains import AcademicDomains
from users.serializers.academic_domains import AcademicDomainsModelSerializer


class AcademicDomainsViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = AcademicDomains.objects.all()
    serializer_class = AcademicDomainsModelSerializer

    def create(self, request, *args, **kwargs):
        if AcademicDomains.objects.filter(domain=request.data["domain"]).exists():
            return Response({}, status=status.HTTP_200_OK)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)
