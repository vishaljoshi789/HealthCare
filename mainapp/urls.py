from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterUserView, UserViewSet, TimelineViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('timeline', TimelineViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'), 
    path('auth/register/', RegisterUserView.as_view(), name='register'),
]