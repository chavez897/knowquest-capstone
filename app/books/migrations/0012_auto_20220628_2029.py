# Generated by Django 3.1.7 on 2022-06-28 20:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0011_booksratings_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booksratings',
            old_name='created_at',
            new_name='created',
        ),
    ]
