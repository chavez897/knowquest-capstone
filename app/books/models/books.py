from django.db import models


class Books(models.Model):

    isbn = models.CharField(
        verbose_name="isbn",
        max_length=13
    )

    image = models.CharField(
        verbose_name="image",
        max_length=5000,
        blank=True,
        null=True,
    )

    title = models.CharField(
        verbose_name="title",
        max_length=250
    )

    description = models.CharField(
        verbose_name="description",
        max_length=2000
    )

    publisher = models.CharField(
        verbose_name="publisher",
        max_length=500,
        blank=True,
        null=True,
    )

    authors = models.CharField(
        verbose_name="authors",
        max_length=1000,
        blank=True,
        null=True,
    )

    publish_date = models.DateField(
        verbose_name="publish date",
        auto_now_add=False,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "book"
        verbose_name_plural = "books"

    def __str__(self):
        return self.title