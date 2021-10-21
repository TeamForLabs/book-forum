GENRES = {
    'книги аформізмов і цитат': '/hudozhestvennaja-literatura/aforizmy-i-citaty.html',
    'детективи': '/hudozhestvennaja-literatura/detektiv.html',
    'трилер': '/hudozhestvennaja-literatura/triller.html',
    'бойовик': '/hudozhestvennaja-literatura/boevik.html',
    'п\'єси': '/hudozhestvennaja-literatura/p-esy.html',
    'книги про середньовіччя': '/drevnjaja-grecija-rim-srednevekov-e.html',
    'романтична проза': '/hudozhestvennaja-literatura/zhenskaja-proza.html',
    'кіноромани і екранізації': '/kinoromany-jekranizacii.html',
    'класична проза': '/hudozhestvennaja-literatura/klassicheskaja-proza.html',
    'книги казок, міфи і фольклор': '/hudozhestvennaja-literatura/mify-skazki-fol-klor.html',
    'поезія, збірки віршів': '/hudozhestvennaja-literatura/pojezija.html',
    'книги проза': '/hudozhestvennaja-literatura/proza-zhanry-i-techenija.html',
    'книги оповідання та короткі історії': '/hudozhestvennaja-literatura/rasskazy-korotkie-istorii.html',
    'сучасна проза': '/hudozhestvennaja-literatura/sovremennaja-proza.html',
    'українська література': '/hudozhestvennaja-literatura/ukrainskaja-literatura.html',
    'книги фентезі і фантастика': '/hudozhestvennaja-literatura/fantastika-fjentezi.html',
    'збірники есе і коріспонденція': '/hudozhestvennaja-literatura/jesse-korrespondencija.html',
    'гумор і сатира': '/hudozhestvennaja-literatura/jumor-satira.html'
}

SELECTORS = {
    'title': '//*[@id="tab-content-description"]/div/div[1]/div[1]/div[1]/h2/span/text()',
    'page_amount': '//tr[./td/div/div[contains(text(), \'Кількість сторінок\')]]/td/text()',
    'author': 'body > div.wrapper > div.main-container.case > div > div.main.row > div > article > '
              'div.product-view.type-simple > section.product-view-box-top.clearfix > div.product-shop.f-left > '
              'div.product-attributes.product-attributes_short > table > tbody > tr:nth-child(1) > td:nth-child(2) > '
              'a::text',
    'published_year': '//tr[./td/div/div[contains(text(), \'Рік видання\')]]/td/text()',
    'thumbnail': '#image::attr(src)',
    'description': '//*[@id="tab-content-description"]/div/div[1]/div[1]/div[2]//text()',
    'genre': 'body > div.wrapper > div.main-container.case > div > ul > li:last-child > a > span::text'
}