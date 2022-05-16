from django.db import models


class AcademicDomains(models.Model):

    domain = models.CharField(
        verbose_name="School",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "domain"
        verbose_name_plural = "domainss"

    def __str__(self):
        """Return role."""
        return self.domain