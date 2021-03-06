# Generated by Django 3.1.7 on 2022-05-31 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ratings_catalogs', '0001_initial'),
        ('books', '0008_booksratings_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='booksratings',
            name='cost',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ratings_catalogs.cost', verbose_name='cost_range'),
        ),
        migrations.AddField(
            model_name='booksratings',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ratings_catalogs.level', verbose_name='level'),
        ),
        migrations.AddField(
            model_name='booksratings',
            name='semester',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ratings_catalogs.semester', verbose_name='semester'),
        ),
        migrations.AddField(
            model_name='booksratings',
            name='year',
            field=models.IntegerField(default=2022, verbose_name='year'),
        ),
    ]
