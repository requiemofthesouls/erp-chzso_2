from django.urls import path
from rest_framework.routers import DefaultRouter

from projects.api.views import TaskViewSet

router = DefaultRouter()
router.register(r'', TaskViewSet, base_name='tasks')
urlpatterns = router.urls
