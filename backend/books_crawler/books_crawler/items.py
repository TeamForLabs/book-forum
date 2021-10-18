import scrapy
from scrapy_djangoitem import DjangoItem

from books.models import Book


class BooksCrawlerItem(DjangoItem):
    django_model = Book
