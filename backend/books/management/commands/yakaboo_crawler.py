from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings

from books_crawler.books_crawler import settings
from books_crawler.books_crawler.spiders.yakaboo_spider import YakabooSpider


class Command(BaseCommand):
    help = "Crawl the Yakaboo"

    def handle(self, *args, **options):
        crawler_settings = Settings()
        crawler_settings.setmodule(settings)
        process = CrawlerProcess(settings=crawler_settings)

        process.crawl(YakabooSpider)
        process.start()
