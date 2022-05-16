from django.contrib import admin
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


router = routers.DefaultRouter()
router.register("auth", UserAuthViewSet, basename="auth")
router.register("auth", UserAuthNonAtomicViewSet, basename="auth_not_atomic")
router.register("users", UserViewSet)
router.register("schools", SchoolsViewSet)
router.register("study-area", StudyAreaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("auth-token/", obtain_auth_token),
    path('', include(router.urls)),
]
