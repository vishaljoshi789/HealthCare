from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Timeline, AIChats

UserModel = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ['password', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions', 'date_joined']

class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = '__all__'

class AIChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIChats
        fields = '__all__'