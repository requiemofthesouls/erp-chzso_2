from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/projects/', include('projects.api.urls_projects')),
    path('api/tasks/', include('projects.api.urls_tasks'))
]
