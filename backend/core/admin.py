from django.contrib import admin

# Register your models here.
from core.models import Record


class RecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'requestUser', 'requestMethod', 'created_at', 'responseCode')


admin.site.register(Record, RecordAdmin)
