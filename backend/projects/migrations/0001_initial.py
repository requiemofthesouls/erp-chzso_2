# Generated by Django 2.2 on 2019-04-14 09:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_modified', models.DateTimeField(auto_created=True, auto_now=True, verbose_name='last modified')),
                ('title', models.CharField(max_length=1000, verbose_name='Title')),
                ('active', models.BooleanField(default=True, verbose_name='Active?')),
                ('slug', models.SlugField(allow_unicode=True, default=None, max_length=1000, null=True, verbose_name='Slug')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('entry', models.CharField(blank=True, max_length=255, verbose_name='Entry')),
                ('priority', models.IntegerField(default=0, verbose_name='Priority')),
                ('old_id', models.IntegerField(default=0, verbose_name='OldId')),
                ('manager', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Ответственный')),
            ],
            options={
                'verbose_name': 'Projects',
                'verbose_name_plural': 'Projects',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_modified', models.DateTimeField(auto_created=True, auto_now=True, verbose_name='last modified')),
                ('title', models.CharField(max_length=1000, verbose_name='Title')),
                ('active', models.BooleanField(default=True, verbose_name='Active?')),
                ('slug', models.SlugField(allow_unicode=True, default=None, max_length=1000, null=True, verbose_name='Slug')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('priority', models.IntegerField(default=0, verbose_name='Priority')),
                ('status', models.CharField(choices=[('new', 'New'), ('current', 'Current'), ('suspend', 'Suspend'), ('done', 'Done'), ('cancel', 'Canceled')], default='new', max_length=255, verbose_name='Status')),
                ('start', models.DateTimeField(blank=True, null=True, verbose_name='Time start')),
                ('due', models.DateTimeField(blank=True, null=True, verbose_name='Time due')),
                ('time_required', models.IntegerField(blank=True, null=True, verbose_name='Time required')),
                ('time_spent', models.IntegerField(blank=True, null=True, verbose_name='Time spent')),
                ('assigned_on', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Assigned on')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.Project', verbose_name='Projects')),
            ],
            options={
                'verbose_name': 'Task',
                'verbose_name_plural': 'Tasks',
                'ordering': ['-id'],
            },
        ),
    ]
