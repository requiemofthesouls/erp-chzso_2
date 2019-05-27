from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls.static import static

from .views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('auth/', include('core.urls')),
    path('api/projects/', include('projects.api.urls_projects')),
    path('api/tasks/', include('projects.api.urls_tasks')),
    path('api/users/', include('users.api.urls_users')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()
