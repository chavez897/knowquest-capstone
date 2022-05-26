from posixpath import basename
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from users.views.users import UserViewSet
from users.views.auth import (
    UserAuthNonAtomicViewSet,
    UserAuthViewSet,
)
from users.views.schools import SchoolsViewSet
from users.views.study_area import StudyAreaViewSet
from partners.views.partners import PartnersViewSet
from contests.views.contests import ContestsViewSet
from books.views.books import BooksViewSet



router = routers.DefaultRouter()
router.register("auth", UserAuthViewSet, basename="auth")
router.register("auth", UserAuthNonAtomicViewSet, basename="auth_not_atomic")
router.register("users", UserViewSet)
router.register("schools", SchoolsViewSet)
router.register("study-area", StudyAreaViewSet)
router.register("partners", PartnersViewSet, basename="partners")
router.register("contests", ContestsViewSet, basename="contests")
router.register("books", BooksViewSet, basename="books")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("auth-token/", obtain_auth_token),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
