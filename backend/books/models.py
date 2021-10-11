from django.contrib.auth.models import User
from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField(max_length=2500)
    thumbnail = models.URLField(max_length=500)
    published_year = models.PositiveSmallIntegerField(default=1984)
    genres = models.ManyToManyField('Genre', related_name='books')
    author = models.ForeignKey('Author',
                               on_delete=models.CASCADE,
                               related_name='books')
    creator = models.ForeignKey(User,
                                related_name='books',
                                on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} ({self.author.full_name})'


class Author(models.Model):
    full_name = models.CharField(max_length=300)

    def __str__(self):
        return self.full_name


class Genre(models.Model):
    title = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.title
