from django.contrib import admin

# Register your models here.
from core.models import LogRecord


class RecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'requestUser', 'requestMethod', 'created_at', 'responseCode')


admin.site.register(LogRecord, RecordAdmin)
