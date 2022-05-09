from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _


from users.models import User




@admin.register(User)
class CustomUserAdmin(UserAdmin):
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

