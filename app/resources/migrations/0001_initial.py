# Generated by Django 3.1.7 on 2022-06-27 03:48

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ratings_catalogs', '0002_auto_20220531_1704'),
        ('users', '0008_auto_20220511_2055'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resources',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resource_name', models.URLField(unique=True, verbose_name='resource_name')),
                ('title', models.CharField(max_length=250, verbose_name='title')),
                ('media_type', models.CharField(max_length=500, verbose_name='media_type')),
            ],
            options={
                'verbose_name': 'resource',
                'verbose_name_plural': 'resources',
            },
        ),
        migrations.CreateModel(
            name='ResourcesRatings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('effective', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='effective')),
                ('relevant', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='relevant')),
                ('easyUse', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='easyUse')),
                ('value', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='value')),
                ('classHelped', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='classHelped')),
                ('overall', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(0)], verbose_name='overall')),
                ('recommend', models.BooleanField(verbose_name='recommend')),
                ('comments', models.TextField(blank=True, null=True, verbose_name='comments')),
                ('resource_type', models.CharField(max_length=250, unique=True, verbose_name='resource_type')),
                ('year', models.IntegerField(default=2022, verbose_name='year')),
                ('level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ratings_catalogs.level', verbose_name='level')),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.resources', verbose_name='Resource')),
                ('semester', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ratings_catalogs.semester', verbose_name='semester')),
                ('subject', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.studyarea', verbose_name='subject')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'resource rating',
                'verbose_name_plural': 'resource ratings',
            },
        ),
    ]
