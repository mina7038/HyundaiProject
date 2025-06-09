from django.urls import path
from .views import chat_view # 함수로 만듬 (ChatView = class로 만듬)

urlpatterns = [
    path("", chat_view),
]