# Generated by Django 3.2.8 on 2021-10-18 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_auto_20211016_0928'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='page_amount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
