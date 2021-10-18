import scrapy
from scrapy_djangoitem import DjangoItem

from books.models import Book


class BooksCrawlerItem(DjangoItem):
    django_model = Book


selectors = {
    'title': '//*[@id="tab-content-description"]/div/div[1]/div[1]/div[1]/h2/span/text()',
    'page_amount': '//tr[./td/div/div[contains(text(), \'Кількість сторінок\')]]/td/text()',
    'author': 'body > div.wrapper > div.main-container.case > div > div.main.row > div > article > div.product-view.type-simple > section.product-view-box-top.clearfix > div.product-shop.f-left > div.product-attributes.product-attributes_short > table > tbody > tr:nth-child(1) > td:nth-child(2) > a::text',
    'published_year': '//tr[./td/div/div[contains(text(), \'Рік видання\')]]/td/text()',
    'thumbnail': '#image::attr(src)',
    'description': '//*[@id="tab-content-description"]/div/div[1]/div[1]/div[2]//text()',
}


class YakabooSpider(scrapy.Spider):
    name = 'yakaboo'
    start_urls = [f"https://www.yakaboo.ua/ua/knigi.html?book_lang=Ukrainskij&p={page}" for page in range(1, 2)]

    def parse(self, response, **kwargs):
        items = response.css('.item.last')
        for item in items:
            book_url = item.css('a::attr(href)')[0].get()
            yield scrapy.Request(book_url, self.parse_single)

    def parse_single(self, response):
        book = BooksCrawlerItem()
        book['title'] = response.xpath(selectors['title']).get()
        book['page_amount'] = int(response.xpath(selectors['page_amount'])[1].get().strip().split(' ')[0])
        book['thumbnail'] = response.css(selectors['thumbnail']).get()
        book['author'] = response.css(selectors['author']).get()
        book['published_year'] = int(response.xpath(selectors['published_year']).get().strip())
        book['description'] = ' '.join(response.xpath(selectors['description']).extract()).strip()
        return book
