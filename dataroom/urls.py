from rest_framework.routers import DefaultRouter
from .views import DataroomViewSet
router = DefaultRouter()
router.register(r'', DataroomViewSet, basename='dataroom')
urlpatterns = router.urls