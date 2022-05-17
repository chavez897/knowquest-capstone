# Generated by Django 3.1.7 on 2022-05-17 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Partners',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('logo', models.ImageField(blank=True, max_length=1000, null=True, upload_to='partners/logo/%Y/%m/%d/', verbose_name='Logo')),
                ('name', models.CharField(max_length=250, verbose_name='name')),
                ('offers', models.CharField(max_length=500, verbose_name='offers')),
                ('description', models.CharField(max_length=1000, verbose_name='description')),
                ('initial_limited_time', models.DateField(blank=True, null=True, verbose_name='intial date')),
                ('final_limited_time', models.DateField(blank=True, null=True, verbose_name='final date')),
                ('locations', models.CharField(max_length=250, verbose_name='loactions')),
            ],
            options={
                'verbose_name': 'partner',
                'verbose_name_plural': 'partners',
            },
        ),
    ]
