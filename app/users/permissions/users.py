"""Users permissions classes."""
from rest_framework.permissions import BasePermission

from users.models.users import User
from users.models.roles import UserRole


class IsAdmin(BasePermission):
    """Allow access only to admins."""

    def __init__(self):
        super(IsAdmin, self).__init__()
        self.is_admin = UserRole.objects.get(role="admin")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_admin
            )
            return True

        except User.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_admin
            )
            return True

        except User.DoesNotExist:
            return False


class IsStudent(BasePermission):
    """Allow access only to managers."""

    def __init__(self):
        super(IsStudent, self).__init__()
        self.is_student = UserRole.objects.get(role="student")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_student
            )
            return True

        except User.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_student
            )

            return True

        except User.DoesNotExist:
            return False


class IsFacultyMember(BasePermission):
    """Allow access only to sellers."""

    def __init__(self):
        super(IsFacultyMember, self).__init__()
        self.is_faculty_member= UserRole.objects.get(role="faculty member")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_faculty_member
            )
            return True

        except User.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            User.objects.get(
                username=request.user, is_active=True, role=self.is_faculty_member
            )

            return True

        except User.DoesNotExist:
            return False


class IsAccountOwner(BasePermission):
    """Allow access only to objects owned by the requesting user."""

    def has_object_permission(self, request, view, obj):
        """Check obj and user are the same."""
        return request.user == obj.user


class IsProfileOwner(BasePermission):
    """Allow access only to objects owned by the requesting user."""

    def has_object_permission(self, request, view, obj):
        """Check obj and user are the same."""
        return request.user == obj