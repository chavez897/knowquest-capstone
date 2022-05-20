from django.db import models


class Contests(models.Model):

    logo = models.ImageField(
        verbose_name="Logo",
        upload_to="contests/logo/%Y/%m/%d/",
        max_length=1000,
        blank=True,
        null=True,
    )

    name = models.CharField(
        verbose_name="name",
        max_length=250
    )

    offers = models.CharField(
        verbose_name="offers",
        max_length=500
    )

    description = models.CharField(
        verbose_name="description",
        max_length=1000
    )

    initial_limited_time = models.DateField(
        verbose_name="intial date",
        auto_now_add=False,
        blank=True,
        null=True,
    )

    final_limited_time = models.DateField(
        verbose_name="final date",
        auto_now_add=False,
        blank=True,
        null=True,
    )

    locations = models.CharField(
        verbose_name="loactions",
        max_length=250
    )

    class Meta:
        verbose_name = "contest"
        verbose_name_plural = "contests"

    def __str__(self):
        return self.name