# notice/views.py
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Notice
from .serializers import NoticeSerializer
from django.db.models import F
from django.core.cache import cache
from rest_framework.decorators import api_view


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user_ip = self.get_client_ip(request)

        cache_key = f"hit:{user_ip}:{instance.id}"  # IP+공지ID 조합으로 캐시 키 생성
        if not cache.get(cache_key):
            instance.hits = F('hits') + 1
            instance.save(update_fields=['hits'])
            instance.refresh_from_db()
            cache.set(cache_key, True, timeout=60*60)  # 1시간 동안 캐시 유지

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_client_ip(self, request):
        """사용자의 IP 주소 가져오기"""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
    
@api_view(['GET'])
def get_adjacent_notices(request, pk):
    try:
        current_notice = Notice.objects.get(pk=pk)
    except Notice.DoesNotExist:
        return Response({'error': '해당 글이 존재하지 않습니다.'}, status=404)

    # 🔄 id 기반 이전/다음 글
    newer_notice = Notice.objects.filter(id__gt=pk).order_by('id').first()  # 더 최신
    older_notice = Notice.objects.filter(id__lt=pk).order_by('-id').first()  # 더 이전

    return Response({
        'next': NoticeSerializer(newer_notice).data if newer_notice else None,
        'prev': NoticeSerializer(older_notice).data if older_notice else None
    })


    