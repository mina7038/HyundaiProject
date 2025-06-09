# users/urls.py
from django.urls import path
from .views import (
    RegisterView, CustomTokenObtainPairView, check_username,
    ProfileView, UserListView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("check-username/", check_username, name="check_username"),
    path("list/", UserListView.as_view(), name="user_list"),
]