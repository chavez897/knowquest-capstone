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
from announcements.views.announcements import AnnouncementsViewSet
from books.views.books_ratings import BooksRatingsViewSet
from ratings_catalogs.views.cost import CostViewSet
from ratings_catalogs.views.level import LevelViewSet
from ratings_catalogs.views.semester import SemesterViewSet
from users.views.academic_domains import AcademicDomainsViewSet


router = routers.DefaultRouter()
router.register("auth", UserAuthViewSet, basename="auth")
router.register("auth", UserAuthNonAtomicViewSet, basename="auth_not_atomic")
router.register("users", UserViewSet)
router.register("schools", SchoolsViewSet)
router.register("study-area", StudyAreaViewSet)
router.register("partners", PartnersViewSet, basename="partners")
router.register("contests", ContestsViewSet, basename="contests")
router.register("books", BooksViewSet, basename="books")
router.register("announcements", AnnouncementsViewSet, basename="announcements")
router.register("books-ratings", BooksRatingsViewSet, basename="books-ratings")
router.register("cost", CostViewSet, basename="cost")
router.register("level", LevelViewSet, basename="level")
router.register("semester", SemesterViewSet, basename="semester")
router.register("academicdomains", AcademicDomainsViewSet, basename="academicdomains")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("auth-token/", obtain_auth_token),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
