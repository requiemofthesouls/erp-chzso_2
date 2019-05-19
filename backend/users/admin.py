from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile


@admin.register(UserProfile)
class CustomUserAdmin(admin.ModelAdmin):
    exclude = ('', )
    list_display = ('id', 'username', 'first_name', 'last_name', 'email')

