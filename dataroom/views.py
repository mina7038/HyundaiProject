from django.shortcuts import render
from rest_framework import viewsets
from .models import Dataroom
from .serializers import DataroomSerializer
import os
from rest_framework.pagination import PageNumberPagination

class DataroomPagination(PageNumberPagination):
    page_size = 10  # 페이지당 10개씩

# Create your views here.
class DataroomViewSet(viewsets.ModelViewSet):
    queryset = Dataroom.objects.all().order_by('-id')
    serializer_class = DataroomSerializer
    def perform_destroy(self, instance):
        if instance.file and os.path.isfile(instance.file.path):
            os.remove(instance.file.path)
        instance.delete()