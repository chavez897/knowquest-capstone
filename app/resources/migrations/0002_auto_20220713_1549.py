# Generated by Django 3.1.7 on 2022-07-13 15:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='resourcesratings',
            old_name='classHelped',
            new_name='class_helped',
        ),
        migrations.RenameField(
            model_name='resourcesratings',
            old_name='easyUse',
            new_name='easy_use',
        ),
    ]