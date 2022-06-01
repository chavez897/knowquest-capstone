from django.db import models


class Level(models.Model):

    name = models.CharField(
        verbose_name="level",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "level"
        verbose_name_plural = "levels"

    def __str__(self):
        return self.name