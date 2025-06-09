# users/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS
# 로그인 중인 사용자는 자기 자신 정보를 읽기 전용으로 활용하고 있음
class IsSelfOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj == request.user