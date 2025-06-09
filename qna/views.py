# qna/views.py
from rest_framework import viewsets, permissions
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Question.objects.all().order_by('-created_at')
        elif user.is_authenticated:
            return Question.objects.filter(author=user).order_by('-created_at')
        return Question.objects.none()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_staff or instance.author == request.user:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            raise PermissionDenied("접근 권한이 없습니다.")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('created_at')
    serializer_class = AnswerSerializer
    permission_classes = [IsAdminUser]  # ✅ 관리자만 작성 가능

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
