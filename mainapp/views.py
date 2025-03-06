from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .serializers import UserSerializer, TimelineSerializer, AIChatsSerializer
from rest_framework import viewsets
from .models import Timeline, AIChats
import google.generativeai as genai
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

# Create your views here.

User = get_user_model()
genai.configure(api_key="AIzaSyBLj0cg85ucyRdrFbfXmoXqv01EozwPnws")
model = genai.GenerativeModel("gemini-2.0-flash")


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                password=serializer.validated_data['password'],
            )
            user.save()

            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    permission_classes = [IsAuthenticated]

class AIChatsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AIChatsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = request.user
            message = serializer.validated_data['message']
            if serializer.validated_data['type'] == 'Prediction':
                chat = model.start_chat(history=[{"role": "system", "parts": ["You are a helpful AI assistant specialized in healthcare. Provide detailed and professional responses."]}])
                response = chat.send_message(message)
            AIChats.objects.create(user=user, message=message, response=response, type=serializer.validated_data['type'])
            return Response({"response": response}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)