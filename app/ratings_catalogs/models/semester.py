from django.db import models


class Semester(models.Model):

    name = models.CharField(
        verbose_name="Semester",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "semester"
        verbose_name_plural = "semesters"

    def __str__(self):
        return self.name