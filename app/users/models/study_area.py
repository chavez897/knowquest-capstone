from django.db import models


class StudyArea(models.Model):

    name = models.CharField(
        verbose_name="Study Area",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "study area"
        verbose_name_plural = "study areas"

    def __str__(self):
        """Return role."""
        return self.name