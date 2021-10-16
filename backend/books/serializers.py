from django.contrib.auth.models import User
from rest_framework import serializers

from books.models import Book, Comment


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


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ('text', 'username')
        extra_kwargs = {
            'username': {'read_only': True},
        }


class BookDetailsSerializer(BookSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = (
            'id', 'title', 'thumbnail', 'published_year', 'author_name', 'author', 'description', 'genres',
            'book_genres', 'comments')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'bookmarks')
