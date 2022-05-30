from announcements.models.announcements import Announcement
from django.contrib import admin

@admin.register(Announcement)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "announcements", "date")
    list_display_links = ("id", "announcements")
