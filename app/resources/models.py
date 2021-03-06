#import resource
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class MediaType(models.Model):

    name = models.CharField(
        verbose_name="title",
        max_length=250
    )

    class Meta:
        verbose_name = "media type"
        verbose_name_plural = "media types"

    def __str__(self):
        return self.name

class Resources(models.Model):

    resource_name = models.URLField(
        verbose_name="resource_name",
        unique=True,
    )

    title = models.CharField(
        verbose_name="title",
        max_length=250
    )

    media_type = models.ForeignKey(
        verbose_name="media type",
        on_delete=models.CASCADE,
        to="resources.MediaType",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "resource"
        verbose_name_plural = "resources"

    def __str__(self):
        return self.title

# Resources ratings models

class ResourcesRatings(models.Model):

    resource = models.ForeignKey(
        verbose_name="Resource",
        on_delete=models.CASCADE, 
        to='Resources'
    )

    effective = models.IntegerField(
        verbose_name="effective",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    relevant = models.IntegerField(
        verbose_name="relevant",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    easy_use = models.IntegerField(
        verbose_name="easyUse",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    value = models.IntegerField(
        verbose_name="value",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    class_helped = models.IntegerField(
        verbose_name="classHelped",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    overall = models.IntegerField(
        verbose_name="overall",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    recommend = models.BooleanField(
        verbose_name="recommend",
    )

    comments = models.TextField(
        verbose_name="comments",
        blank=True,
        null=True,
    )

    user = models.ForeignKey(
        verbose_name="User",
        to="users.User",
        on_delete=models.CASCADE,
    )

    subject = models.ForeignKey(
        verbose_name="subject",
        on_delete=models.CASCADE,
        to="users.StudyArea",
        blank=True,
        null=True,
    )

    level = models.ForeignKey(
        verbose_name="level",
        on_delete=models.CASCADE,
        to="ratings_catalogs.Level",
        blank=True,
        null=True,
    )

    semester = models.ForeignKey(
        verbose_name="semester",
        on_delete=models.CASCADE,
        to="ratings_catalogs.Semester",
        blank=True,
        null=True,
    )

    year = models.IntegerField(
        verbose_name="year",
        default=2022
    )

    created = models.DateField(
        verbose_name="creation date",
        auto_now_add=True,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "resource rating"
        verbose_name_plural = "resource ratings"

    def __str__(self):
        return "{} - {}".format(self.resource.title, self.overall)