"""
URL configuration for pro05 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# pro05/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from notice.views import NoticeViewSet
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # notices 전체를 notice.urls에서 처리
    path("api/notices/", include("notice.urls")),

    path("api/users/", include("users.urls")),
    path("api/qna/", include("qna.urls")),
    path("api/products/", include("products.urls")),
    path("api/dataroom/", include("dataroom.urls")),
    path("api/chat/", include("chatbot.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


