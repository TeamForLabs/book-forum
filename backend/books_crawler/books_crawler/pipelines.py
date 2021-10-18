# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from django.contrib.auth.models import User
from itemadapter import ItemAdapter

from books.models import Author


class BooksCrawlerPipeline:
    def process_item(self, item, spider):
        existing_authors = Author.objects.filter(full_name=item['author'])
        if existing_authors.exists():
            item['author'] = existing_authors[0]
        else:
            new_author = Author.objects.create(full_name=item['author'])
            item['author'] = new_author
        item['creator'] = User.objects.get(username='test')
        item.save()
        return item
