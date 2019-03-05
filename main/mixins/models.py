# -*- coding: utf-8 -*-
from django.db import models

from django.utils.translation import gettext_lazy as _

DEFAULT_ACTIONS = ('list', 'detail', 'update', 'add', 'delete')
DEFAULT_PERMISSIONS = ('view', 'change', 'add', 'delete')


class ERPModel(models.Model):
    LIST_VIEW_FIELD_NAMES = ()
    DETAIL_VIEW_FIELD_NAMES = ()
    title = models.CharField(
        verbose_name=_('Title'),
        max_length=1000
    )

    active = models.BooleanField(
        verbose_name=_('Active?'),
        default=True
    )

    slug = models.SlugField(
        verbose_name=_('Slug'),
        max_length=1000,
        allow_unicode=True,

    )

    last_modified = models.DateTimeField(
        auto_created=True,
        auto_now=True,
        verbose_name=_('last modified')
    )

    class Meta:
        abstract = True
