# Generated by Django 3.1.7 on 2022-05-10 20:39

from django.db import migrations

def create_default_user_roles(apps, schema_editor):
    UserRole = apps.get_model("users", "UserRole")

    UserRole.objects.create(role="admin")
    UserRole.objects.create(role="faculty member")
    UserRole.objects.create(role="student")
    UserRole.objects.create(role="regular")

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_schools_studyarea_userrole'),
    ]

    operations = [
        migrations.RunPython(create_default_user_roles),
    ]