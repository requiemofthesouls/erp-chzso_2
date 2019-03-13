from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/projects/', include('projects.api.urls_projects')),
    path('api/tasks/', include('projects.api.urls_tasks'))
]


if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
