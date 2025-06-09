# qna/serializers.py
from rest_framework import serializers
from .models import Question, Answer

# qna/serializers.py
class AnswerSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    author = serializers.PrimaryKeyRelatedField(read_only=True)  # ✅ 추가

    class Meta:
        model = Answer
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)  # ✅ 추가
    author_username = serializers.CharField(source='author.username', read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    is_answered = serializers.SerializerMethodField()  # ✅ 이 줄 추가

    class Meta:
        model = Question
        fields = '__all__'

    def get_is_answered(self, obj):
        return obj.answers.exists()  # 답변이 하나라도 있으면 True

