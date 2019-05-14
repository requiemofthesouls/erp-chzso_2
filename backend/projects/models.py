# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_jwt.serializers import User

from main.mixins.models import ERPModel


class Image(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    file = models.ImageField(upload_to='images', default='images/default_avatar.png')


class Project(ERPModel):
    manager = models.ForeignKey(User, verbose_name='Ответственный', on_delete=models.CASCADE, default=None)
    description = models.TextField(blank=True, verbose_name=_('Description'))
    entry = models.CharField(blank=True, max_length=255, verbose_name=_('Entry'))
    priority = models.IntegerField(default=0, verbose_name=_('Priority'))
    old_id = models.IntegerField(default=0, verbose_name=_('OldId'))

    class Meta:
        ordering = ['-id']
        verbose_name = _('Project')
        verbose_name_plural = _('Projects')
        # permissions = get_erp_permissions('Tasks')


class Task(ERPModel):
    STATUS_LIST = (
        ('new', _('New')),
        ('current', _('Current')),
        ('suspend', _('Suspend')),
        ('done', _('Done')),
        ('cancel', _('Canceled')),
    )
    project = models.ForeignKey(Project, verbose_name=_('Project'), on_delete=models.CASCADE)
    description = models.TextField(blank=True, verbose_name=_('Description'))
    priority = models.IntegerField(default=0, verbose_name=_('Priority'))
    status = models.CharField(max_length=255, verbose_name=_('Status'), choices=STATUS_LIST, default='new')
    assigned_on = models.ForeignKey(User, verbose_name=_('Assigned on'), on_delete=models.CASCADE, default=None)

    start = models.DateTimeField(
        verbose_name=_('Time start'),
        blank=True,
        null=True
    )

    due = models.DateTimeField(
        verbose_name=_('Time due'),
        blank=True,
        null=True
    )

    time_required = models.IntegerField(
        verbose_name=_('Time required'),
        blank=True,
        null=True
    )

    time_spent = models.IntegerField(
        verbose_name=_('Time spent'),
        blank=True,
        null=True
    )

    class Meta:
        ordering = ['-id']
        verbose_name = _('Task')
        verbose_name_plural = _('Tasks')
        # permissions = get_erp_permissions('Task')
