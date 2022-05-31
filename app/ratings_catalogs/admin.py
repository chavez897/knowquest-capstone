from django.contrib import admin

from ratings_catalogs.models.cost import Cost
from ratings_catalogs.models.level import Level
from ratings_catalogs.models.semester import Semester


@admin.register(Cost)
class CostModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", )


@admin.register(Level)
class LevelModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", )


@admin.register(Semester)
class SemesterModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", )