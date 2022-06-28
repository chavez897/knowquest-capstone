from django.contrib import admin

# Register your models here.
from .models import Resources, ResourcesRatings



@admin.register(Resources)
class ResourcesModelAdmin(admin.ModelAdmin):
    list_display = ("id", "resource_name", "title", "media_type")
    list_display_links = ("id", "resource_name", )


@admin.register(ResourcesRatings)
class ResourcesModelAdmin(admin.ModelAdmin):
    list_display = ("id", "resource", "overall")
    list_display_links = ("id", )




