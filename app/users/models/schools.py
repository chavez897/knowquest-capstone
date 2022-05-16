from django.db import models


class Schools(models.Model):

    name = models.CharField(
        verbose_name="School",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "school"
        verbose_name_plural = "Schools"

    def __str__(self):
        """Return role."""
        return self.name