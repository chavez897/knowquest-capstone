from django.contrib import admin

from partners.models.partners import Partners


@admin.register(Partners)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    list_display_links = ("id", "name")

