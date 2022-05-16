from django.db import models


class UserRole(models.Model):

    role = models.CharField(
        verbose_name="Role",
        unique=True,
        max_length=24,
        primary_key=True,
    )

    class Meta:
        verbose_name = "role"
        verbose_name_plural = "Roles"

    def __str__(self):
        """Return role."""
        return self.role