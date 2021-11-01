from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings

from books_crawler.books_crawler import settings
from books_crawler.books_crawler.spiders.yakaboo_spider import YakabooSpider


class Command(BaseCommand):
    help = "Crawl the Yakaboo"

    def add_arguments(self, parser):
        parser.add_argument('pages', type=int, help='Amount of pages to crawl')
        parser.add_argument('--genre',
                            type=str,
                            help='The genre of books to scrape')

    def handle(self, *args, **options):
        crawler_settings = Settings()
        crawler_settings.setmodule(settings)
        process = CrawlerProcess(settings=crawler_settings)

        start_urls = []
        slug = "https://www.yakaboo.ua/ua/knigi{}?book_lang=Ukrainskij&p={}"
        for page in range(1, options['pages'] + 1):
            genre = options['genre'] if options['genre'] else '.html'
            url = slug.format(genre, page)
            start_urls.append(url)

        print('Initializing the Yakaboo crawler...')
        process.crawl(YakabooSpider, start_urls=start_urls)
        process.start()
        print('Crawler has finished the work!')
