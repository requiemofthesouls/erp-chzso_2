from rest_framework.routers import DefaultRouter

from core.views import LogsList

router = DefaultRouter()
router.register(r'', LogsList, base_name='logs')
urlpatterns = router.urls
