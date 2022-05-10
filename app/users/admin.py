from django.contrib import admin
from django.utils.translation import gettext_lazy as _


from users.models import User
from users.models.roles import UserRole
from users.models.schools import Schools
from users.models.study_area import StudyArea


@admin.register(UserRole)
class RoleModelAdmin(admin.ModelAdmin):
    list_display = ("role",)
    list_display_links = ("role", )


@admin.register(Schools)
class SchoolModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", )


@admin.register(StudyArea)
class StudyAreaModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", )



@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    """User model admin."""

    list_display = (
        "id",
        "email",
        "username",
        "is_active",
        "is_verified",
    )
    list_filter = ("is_superuser",)
    list_editable = (
        "is_active",
        "is_verified",
    )
    search_fields = ("username", "email")

