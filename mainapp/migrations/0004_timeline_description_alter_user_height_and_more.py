# Generated by Django 5.1.6 on 2025-03-07 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_user_allergies_user_medications'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeline',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='height',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='weight',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
