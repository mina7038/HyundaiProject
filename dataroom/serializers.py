from rest_framework import serializers
from .models import Dataroom
class DataroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataroom
        fields = '__all__'