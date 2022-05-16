# Generated by Django 3.1.7 on 2022-05-10 20:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20220510_2039'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.ForeignKey(default='regular', on_delete=django.db.models.deletion.CASCADE, to='users.userrole', verbose_name='User Role'),
        ),
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.schools', verbose_name='School'),
        ),
        migrations.AddField(
            model_name='user',
            name='study_area',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.studyarea', verbose_name='study area'),
        ),
    ]
