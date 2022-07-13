from django.contrib import admin

# Register your models here.
from .models import Resources, ResourcesRatings, MediaType


@admin.register(MediaType)
class MediaTypeModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name",)
    list_display_links = ("id", "name", )

@admin.register(Resources)
class ResourcesModelAdmin(admin.ModelAdmin):
    list_display = ("id", "resource_name", "title", "media_type")
    list_display_links = ("id", "resource_name", )


@admin.register(ResourcesRatings)
class ResourcesModelAdmin(admin.ModelAdmin):
    list_display = ("id", "resource", "overall")
    list_display_links = ("id", )




