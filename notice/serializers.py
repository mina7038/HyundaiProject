# notice/serializer.py : 오고 가는 객체 데이터를 직렬화하는 역할
from rest_framework import serializers
from .models import Notice

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = "__all__"