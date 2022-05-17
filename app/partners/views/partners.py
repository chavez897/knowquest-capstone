from rest_framework import mixins, viewsets

from partners.models.partners import Partners
from partners.serializers.partners import PartnersModelSerializer


class PartnersViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Partners.objects.all()
    serializer_class = PartnersModelSerializer

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)

