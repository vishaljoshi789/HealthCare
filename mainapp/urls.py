from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterUserView, UserInfoView, TimelineView, AIChatsView
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'), 
    path('auth/register/', RegisterUserView.as_view(), name='register'),
    path('userInfo/', UserInfoView.as_view(), name='userInfo'),
    path('timeline/', TimelineView.as_view(), name='timeline'),
    path('ai/', AIChatsView.as_view(), name='aiChats'),
]