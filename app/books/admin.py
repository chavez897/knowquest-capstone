from django.contrib import admin

from books.models.books import Books


@admin.register(Books)
class BooksModelAdmin(admin.ModelAdmin):
    list_display = ("id", "isbn", "title", "description")
    list_display_links = ("id", "isbn")

