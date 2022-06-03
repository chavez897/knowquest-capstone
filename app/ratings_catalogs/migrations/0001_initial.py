# Generated by Django 3.1.7 on 2022-05-31 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='Cost')),
            ],
            options={
                'verbose_name': 'cost',
                'verbose_name_plural': 'costs',
            },
        ),
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='level')),
            ],
            options={
                'verbose_name': 'level',
                'verbose_name_plural': 'levels',
            },
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='Semester')),
            ],
            options={
                'verbose_name': 'semester',
                'verbose_name_plural': 'semesters',
            },
        ),
    ]