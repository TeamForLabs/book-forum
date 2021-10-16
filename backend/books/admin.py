from django.contrib import admin

from books.models import Book, Author, Genre, Comment


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_year')
    search_fields = ['title', 'author__full_name', 'published_year']
    filter_horizontal = ('genres',)
    readonly_fields = ('created_at',)
    list_filter = [
        'author__full_name',
        'published_year',
        'genres'
    ]


class BookInline(admin.StackedInline):
    model = Book
    classes = ['collapse']


class AuthorAdmin(admin.ModelAdmin):
    search_fields = ['full_name']
    list_display = ('full_name', 'books_count')
    inlines = [BookInline]

    @staticmethod
    def books_count(obj):
        return obj.books.count()


class GenreAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_display = ('title', 'books_count')

    @staticmethod
    def books_count(obj):
        return obj.books.count()


admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Comment)
