import random

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from faker import Faker

from books.models import Author, Genre, Book

fake = Faker(['uk_UA'])

GENRES = ["Paste in some lines of text.Ділова література", "управління економікою", "Кар'єра", "Маркетинг, PR, реклама",
          "фінанси", "Бізнес-довідники", "особисті фінанси", "менеджмент", "Зарубіжна ділова література",
          "Особиста ефективність", "Тайм менеджмент", "Малий бізнес", "продажі", "Стартапи і створення бізнесу",
          "Корпоративна культура", "Банківська справа", "Логістика", "Нерухомість", "Інтернет бізнес",
          "Ораторське мистецтво / риторика", "Залучення клієнтів та лояльність", "діловодство", "переговори",
          "Державне і муніципальне управління, політичне управління", "Про бізнес популярно",
          "Цінні папери / інвестиції", "Бухоблік / оподаткування / аудит", "Російська практика", "Історії успіху",
          "Інтернет маркетинг", "лідерство", "проектний менеджмент", "Управління якістю", "Фінансовий менеджмент",
          "Управління персоналом", "Бізнес процеси", "Керування бізнесом", "Антикризове управління",
          "Організаційний і виробничий менеджмент", "Пошук і підбір персоналу", "мотивація", "Робота з боргами",
          "Інновації в бізнесі", "Креатив і ідеї для бізнесу", "ефективність бізнесу", "Поради від гуру",
          "бюджетування", "трейдинг", "Корпоративні фінанси", "ризики", "Злиття і поглинання", "галузеві видання",
          "ефективна презентація", "Галузева і міжгалузева економіка", "Зовнішньоекономічна діяльність",
          "економічний аналіз", "Мерчендайзинг і управління асортиментом", "Маркетингові дослідження та аналіз",
          "клієнтський сервіс", "брендинг", "копірайтинг", "Детективи і Трилери", "Детективи", "триллер",
          "крутий детектив", "іронічний детектив", "про маніяків", "шпигунський детектив", "кримінальний детектив",
          "класичний детектив", "політичний детектив", "поліцейський детектив", "історичний детектив",
          "радянський детектив", "психологічний детектив", "зарубіжний детектив", "кримінальний бойовики",
          "документальна література", "Публіцистика", "Біографії і Мемуари", "документальна література",
          "Військова документалістика і аналітика", "Військова справа", "Географія, подорожні нотатки", "Нон-фікшн",
          "Книга-мотиватор", "Зарубіжна публіцистика", "Будинок, ремесла, дозвілля, хобі", "Домашні тварини",
          "кулінарія", "домоведення", "Розваги", "Хоббі та ремесла", "Зроби сам", "Автомобілі та ПДР", "Сад і город",
          "Відпочинок, туризм", "Кімнатні рослини", "драматургія", "драматургія", "антична драма", "комедія",
          "сценарій", "Драма, п'єса", "Мистецтво, Мистецтвознавство, Дизайн", "критика", "Мистецтво і Дизайн",
          "культурологія", "мистецтвознавство", "Живопис, альбоми, ілюстровані каталоги", "Скульптура і архітектура",
          "Світова художня культура", "Мода та стиль", "музика", "Комп'ютери та Інтернет",
          "Зарубіжна комп'ютерна, навколокомп'ютерні література", "ОС і Мережі, інтернет",
          "Програмування, програми, бази даних",
          "Комп'ютерне \"залізо\" (апаратне забезпечення), цифрова обробка сигналів",
          "Навчальні посібники, самовчителі", "Література для дітей"]


def create_user():
    username = fake.domain_word()
    email = fake.email()
    return User.objects.create_user(username, email, password="test")


def create_author():
    full_name = fake.name()

    return Author.objects.create(full_name=full_name)


def create_book(author, creator):
    title = fake.bs()
    description = fake.paragraph(nb_sentences=10)
    thumbnail = fake.image_url()
    published_year = fake.pyint(min_value=1800, max_value=2021)
    created_at = fake.date_time()
    b = Book.objects.create(
        title=title,
        description=description,
        thumbnail=thumbnail,
        published_year=published_year,
        author=author,
        creator=creator,
        created_at=created_at
    )
    genres_objects = []
    for title in random.sample(GENRES, random.randint(1, 5)):
        genre = Genre.objects.filter(title=title)
        if not genre:
            genres_objects.append(Genre.objects.create(title=title))
        else:
            genres_objects.append(genre[0])

    b.genres.set(genres_objects)
    return b


class Command(BaseCommand):
    help = "Populate DB with random data"

    def handle(self, *args, **options):
        try:
            User.objects.create_superuser(username='test', password='test')
        except IntegrityError:
            print('Superuser "test" already exists!')
        authors = [create_author() for _ in range(20)]
        u = create_user()

        for _ in range(20):
            b = create_book(random.choice(authors), u)

        u2 = create_user()
        for _ in range(20):
            b = create_book(random.choice(authors), u2)

    print('Successfully created 40 book entities!')
