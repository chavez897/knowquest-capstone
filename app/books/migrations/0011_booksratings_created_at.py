# Generated by Django 3.1.7 on 2022-06-28 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0010_auto_20220607_1759'),
    ]

    operations = [
        migrations.AddField(
            model_name='booksratings',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True, verbose_name='creation date'),
        ),
    ]
