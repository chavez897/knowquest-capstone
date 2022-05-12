# Generated by Django 3.1.7 on 2022-05-10 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20220509_2303'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='School')),
            ],
            options={
                'verbose_name': 'school',
                'verbose_name_plural': 'Schools',
            },
        ),
        migrations.CreateModel(
            name='StudyArea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='Study Area')),
            ],
            options={
                'verbose_name': 'study area',
                'verbose_name_plural': 'study areas',
            },
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('role', models.CharField(max_length=24, primary_key=True, serialize=False, unique=True, verbose_name='Role')),
            ],
            options={
                'verbose_name': 'role',
                'verbose_name_plural': 'Roles',
            },
        ),
    ]