# -*- coding: utf-8 -*-

# from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from main.mixins.models import ERPModel


class Project(ERPModel):
    LIST_VIEW_FIELD_NAMES = ('priority', 'manager', 'old_id')
    # manager = models.ForeignKey(get_user_model(), verbose_name='Ответственный')
    description = models.TextField(blank=True, verbose_name=_('Description'))
    entry = models.CharField(blank=True, max_length=255, verbose_name=_('Entry'))
    priority = models.IntegerField(default=0, verbose_name=_('Priority'))
    old_id = models.IntegerField(default=0, verbose_name=_('OldId'))

    class Meta:
        ordering = ['-id']
        verbose_name = _('Project')
        verbose_name_plural = _('Projects')
        # permissions = get_erp_permissions('Project')

    def __str__(self):
        return self.title


class Task(ERPModel):
    STATUS_LIST = (
        ('new', _('New')),
        ('current', _('Current')),
        ('suspend', _('Suspend')),
        ('done', _('Done')),
        ('cancel', _('Canceled')),
    )
    LIST_VIEW_FIELD_NAMES = ('project', 'assigned_on', 'status', 'due')
    project = models.ForeignKey(Project, verbose_name=_('Project'), on_delete=models.CASCADE)

    description = models.TextField(blank=True, verbose_name=_('Description'))
    priority = models.IntegerField(default=0, verbose_name=_('Priority'))
    status = models.CharField(max_length=255, verbose_name=_('Status'), choices=STATUS_LIST, default='new')

    # assigned_on = models.ForeignKey(get_user_model(), verbose_name=_('Assigned on'), on_delete=models.CASCADE)

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
        verbose_name = _(u'Task')
        verbose_name_plural = _(u'Tasks')
        # permissions = get_erp_permissions('Task')

    def __str__(self):
        return self.title
