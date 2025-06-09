# users/views.py
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import CustomTokenObtainPairSerializer

from .serializers import RegisterSerializer, UserSerializer
from .permissions import IsSelfOrReadOnly
from rest_framework.pagination import PageNumberPagination

# 회원가입
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# 로그인(JWT) - 경로명을 login/ 로 맞춤
class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


# 중복 아이디 체크
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def check_username(request):
    username = request.query_params.get("username", "")
    return Response({"exists": User.objects.filter(username=username).exists()})


# 마이페이지 (조회·수정)
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsSelfOrReadOnly]

    def get_object(self):
        return self.request.user

# 페이지네이션 클래스 (옵션)
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # 기본 페이지 크기
    page_size_query_param = 'page_size'  # 쿼리 파라미터로 크기 조절 가능 (?page_size=5)
    max_page_size = 100

# 관리자용 회원 목록 뷰
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('-id')  # id 기준 내림차순
    permission_classes = [permissions.IsAdminUser]
    pagination_class = StandardResultsSetPagination

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer