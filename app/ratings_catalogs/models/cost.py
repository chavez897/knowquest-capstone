from django.db import models


class Cost(models.Model):

    name = models.CharField(
        verbose_name="Cost",
        unique=True,
        max_length=250
    )

    class Meta:
        verbose_name = "cost"
        verbose_name_plural = "costs"

    def __str__(self):
        return self.name