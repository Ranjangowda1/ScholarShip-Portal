from rest_framework import serializers
from .models import AadhaarEducation

class AadhaarEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AadhaarEducation
        fields = '__all__'
