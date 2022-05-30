from django.db import models


class Contests(models.Model):

    logo = models.ImageField(
        verbose_name="Logo",
        upload_to="contests/logo/%Y/%m/%d/",
        max_length=1000,
        default='default.jpg'
    )

    name = models.CharField(
        verbose_name="name",
        max_length=250,
        blank=True,
        null=True,
    )

    description = models.CharField(
        verbose_name="description",
        max_length=1000,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "contest"
        verbose_name_plural = "contests"

    def __str__(self):
        return self.name