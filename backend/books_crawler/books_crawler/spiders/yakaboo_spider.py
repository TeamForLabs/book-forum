import scrapy
from scrapy_djangoitem import DjangoItem

from books.models import Book
from helpers.enums import SELECTORS


class BooksCrawlerItem(DjangoItem):
    django_model = Book
    genre = scrapy.Field()


class YakabooSpider(scrapy.Spider):
    name = 'yakaboo'
    start_urls = [f"https://www.yakaboo.ua/ua/knigi.html?book_lang=Ukrainskij&p={page}" for page in range(1, 2)]

    def parse(self, response, **kwargs):
        items = response.css('.item.last')
        for item in items:
            book_url = item.css('a::attr(href)')[0].get()
            yield scrapy.Request(book_url, self.parse_single)

    @staticmethod
    def parse_single(response):
        book = BooksCrawlerItem()
        book['title'] = response.xpath(SELECTORS['title']).get()
        book['page_amount'] = int(response.xpath(SELECTORS['page_amount'])[1].get().strip().split(' ')[0])
        book['thumbnail'] = response.css(SELECTORS['thumbnail']).get()
        book['author'] = response.css(SELECTORS['author']).get()
        book['published_year'] = int(response.xpath(SELECTORS['published_year']).get().strip())
        book['description'] = ' '.join(response.xpath(SELECTORS['description']).extract()).strip()
        book['genre'] = response.css(SELECTORS['genre']).get()

        return book
