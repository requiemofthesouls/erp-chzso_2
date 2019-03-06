from django.urls import path
from rest_framework.routers import DefaultRouter

from projects.api.views import ProjectViewSet

router = DefaultRouter()
router.register(r'', ProjectViewSet, base_name='projects')
urlpatterns = router.urls
