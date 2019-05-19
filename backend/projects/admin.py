from django.contrib import admin

from .models import Project, Task


class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Project, ProjectAdmin)


class TaskAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Task, TaskAdmin)
