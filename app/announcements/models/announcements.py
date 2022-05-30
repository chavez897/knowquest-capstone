from django.db import models


class Announcement(models.Model):

    announcements = models.CharField(  
        verbose_name="announcements",
        max_length=1000
    )

    date = models.DateField(
        verbose_name="date",
        auto_now_add=False,
    )

    class Meta:
        verbose_name = "announcement" 
        verbose_name_plural = "announcements" 

    def __str__(self):
        return self.announcements