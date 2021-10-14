from rest_framework import serializers

from books.models import Book


class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    book_genres = serializers.StringRelatedField(source='genres', many=True, read_only=True)

    class Meta:
        model = Book
        fields = (
            'id', 'title', 'thumbnail', 'published_year', 'author_name', 'author', 'description', 'genres',
            'book_genres')
        extra_kwargs = {
            'author': {'write_only': True},
            'genres': {'write_only': True},
        }
