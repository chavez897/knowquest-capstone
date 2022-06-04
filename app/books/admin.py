from django.contrib import admin

from books.models.books import Books
from books.models.books_ratings import BooksRatings


@admin.register(Books)
class BooksModelAdmin(admin.ModelAdmin):
    list_display = ("id", "isbn", "title", "description")
    list_display_links = ("id", "isbn")


@admin.register(BooksRatings)
class BooksModelAdmin(admin.ModelAdmin):
    list_display = ("id", "book", "overall")
    list_display_links = ("id", )