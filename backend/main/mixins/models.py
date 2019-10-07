# -*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from django.db import models

from django.utils.translation import gettext_lazy as _


class ERPModel(models.Model):
    title = models.CharField(
        verbose_name=_('Title'),
        max_length=255
    )

    active = models.BooleanField(
        verbose_name=_('Active?'),
        default=True
    )

    slug = models.SlugField(
        verbose_name=_('Slug'),
        max_length=255,
        allow_unicode=True,
        null=True,
        default=None
    )

    last_modified = models.DateTimeField(
        auto_created=True,
        auto_now=True,
        verbose_name=_('last modified')
    )

    class Meta:
        abstract = True

    @classmethod
    def listview_fields(cls):
        return [field.attname for field in cls._meta.concrete_fields]

    def __str__(self):
        return self.title
