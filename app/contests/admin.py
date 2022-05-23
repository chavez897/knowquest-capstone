from django.contrib import admin

from contests.models.contests import Contests


@admin.register(Contests)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    list_display_links = ("id", "name")
