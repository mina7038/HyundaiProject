from django.urls import path
from .views import NoticeViewSet, get_adjacent_notices
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', NoticeViewSet, basename='notice')  # 'notices' → ''

urlpatterns = [
    path('<int:pk>/adjacent/', get_adjacent_notices, name='notice-adjacent'),  # 🔥 여기서도 'notices/' 제거
]

urlpatterns += router.urls
