from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .serializers import UserSerializer, TimelineSerializer, AIChatsSerializer, UserRegistrationSerializer
from rest_framework import viewsets
from .models import Timeline, AIChats
import google.generativeai as genai
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from PIL import Image

# Create your views here.

User = get_user_model()
genai.configure(api_key="AIzaSyBLj0cg85ucyRdrFbfXmoXqv01EozwPnws")
model = genai.GenerativeModel("gemini-2.0-flash")


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            print(serializer.data)
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
    
    def post(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            userInfo = serializer.save()
            chat = model.generate_content(f"You are a highly experienced and professional AI doctor with expertise in general medicine, diagnostics, and patient care. Your goal is to provide accurate, reliable, and ethical medical advice based on the user's information.  Patient Information:  Date of Birth: {serializer.validated_data['dob']}  Gender: {serializer.validated_data['gender']}  Blood Group: {serializer.validated_data['blood_group']}  Height: {serializer.validated_data['height']} cm  Weight: {serializer.validated_data['weight']} kg  Medical History:  Known Diseases: {serializer.validated_data['disease']}  Allergies: {serializer.validated_data['allergies']}  Current Medications: {serializer.validated_data['medications']}  Based on this data, generate a concise medical summary of the patient just maximum 50 words, focusing on key health aspects, potential risks, and any necessary medical recommendations.")

            response = chat.text
            user = request.user
            user.description = response
            userInfo.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TimelineView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        timelines = Timeline.objects.filter(user=request.user)
        serializer = TimelineSerializer(timelines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = TimelineSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            timeline = serializer.save(user=request.user)
            image_path = timeline.image.path  # Change this to your image path
            image = Image.open(image_path)
            response = model.generate_content(["You are a professional medical assistant that summarizes doctor prescriptions in simple, clear language. Extract key details such as prescribed medications, dosage, frequency, duration, and any special instructions. Ensure accuracy while avoiding medical interpretation or modifications. Emphasize following the doctor’s advice strictly and consulting a healthcare professional for any clarifications. If a prescription involves urgent or critical care, advise seeking immediate medical attention. This image is the prescription given by doctor.", image])
            timeline.description = response.text
            timeline.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AIChatsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AIChatsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = request.user
            message = serializer.validated_data['message']
            if serializer.validated_data['type'] == 'Pregnancy':
                chat = model.generate_content(f"You are an AI-powered professional doctor specializing in obstetrics and gynecology and assessing a pregnant women. Your role is to provide accurate, evidence-based, and empathetic guidance on pregnancy-related topics, including prenatal care, nutrition, common symptoms, fetal development, potential complications, and postpartum recovery. You should ensure that your responses are medically accurate, aligned with international health guidelines (such as WHO and ACOG), and promote safe, informed decision-making. Always emphasize the importance of consulting a qualified healthcare provider for personalized medical advice. Maintain a supportive and non-judgmental tone, particularly when addressing sensitive topics such as high-risk pregnancies, fertility concerns, or mental health during pregnancy. If a question requires urgent medical attention, strongly recommend the user seek immediate help from a healthcare professional. Try to make the response short and should not exceed 60 words The query of the user is: {message}")
                response = chat.text
            elif serializer.validated_data['type'] == 'Child':
                chat = model.generate_content(f"You are a professional pediatrician providing expert guidance on newborn care, including feeding, growth milestones, common health concerns, vaccinations, and warning signs. Ensure responses follow WHO and AAP guidelines and encourage consulting a pediatrician for personalized care. Maintain a supportive tone, and if a query suggests an emergency (e.g., breathing issues, seizures, high fever), strongly advise immediate medical attention. Try to make the response short and should not exceed 60 words The query of the user is: {message}")
                response = chat.text

            elif serializer.validated_data['type'] == 'Consultation':
                chat = model.generate_content(f"You are a professional doctor providing accurate, evidence-based medical guidance on general health, symptoms, diseases, treatments, and preventive care. Follow international health guidelines (WHO, CDC) and encourage consulting a healthcare professional for personalized advice. Maintain a clear, supportive tone, and if a query suggests a medical emergency (e.g., severe pain, difficulty breathing, loss of consciousness), strongly recommend seeking immediate medical attention. Try to make the response short and should not exceed 60 words.About user: {request.user.description}. The query of the user is: {message}")
                response = chat.text

            elif serializer.validated_data['type'] == 'Prescription':
                chat = model.generate_content(f"You are a professional doctor providing evidence-based guidance on disease management and treatment options. While you can explain standard treatments and medications, you must always advise users to consult a licensed healthcare provider for prescriptions. Follow international medical guidelines (WHO, CDC) and emphasize safety, dosage considerations, and potential side effects. If a query suggests a medical emergency (e.g., severe symptoms, allergic reactions), strongly recommend immediate medical attention. Try to make the response short and should not exceed 60 words The query of the user is: {message}")
                response = chat.text

            elif serializer.validated_data['type'] == 'Substitute Medicine':
                chat = model.generate_content(f"You are a professional pharmacist providing evidence-based guidance on medication substitutes. Offer alternative drugs with the same active ingredients, therapeutic effects, and safety profiles while emphasizing the importance of consulting a doctor or pharmacist before switching medications. Follow international medical guidelines (WHO, FDA) and highlight dosage considerations, potential side effects, and contraindications. If a query involves a serious condition or emergency, strongly recommend seeking immediate medical attention. Try to make the response short and should not exceed 60 words The query of the user is: {message}")
                response = chat.text
            
            chat = AIChats.objects.create(user=user, message=message, response=response, type=serializer.validated_data['type'])
            chat.save()
            return Response({"response": response}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
