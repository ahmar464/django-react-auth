from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from urllib.parse import urlencode
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        # Return response with tokens
        return Response({
            'access': access_token,
            'refresh': str(refresh),
            'role': user.role,
            'email': user.email
        }, status=status.HTTP_201_CREATED)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = User.objects.get(email=request.data['email'])
            response.data['role'] = user.role
            response.data['email'] = user.email
        return response

def oauth_success(request):
    """
    Handle successful OAuth login
    """
    if not request.user.is_authenticated:
        logger.error("User not authenticated in oauth_success")
        return redirect(f"{settings.FRONTEND_URL}/login?error=auth_failed")
    
    try:
        user = request.user
        
        # Log user details for debugging
        logger.info(f"OAuth user: {user.email}, role: {user.role}")
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        # Prepare parameters for frontend redirect
        params = urlencode({
            'access_token': access_token,
            'refresh_token': str(refresh),
            'role': user.role,
            'email': user.email,
            'oauth_success': 'true'
        })
        
        # Log redirect URL for debugging
        redirect_url = f"{settings.FRONTEND_URL}/oauth/callback?{params}"
        logger.info(f"Redirecting to: {redirect_url}")
        
        return redirect(redirect_url)
    
    except Exception as e:
        logger.error(f"OAuth success error: {str(e)}")
        return redirect(f"{settings.FRONTEND_URL}/oauth/error?error=server_error")

def oauth_error(request):
    """
    Handle OAuth login error
    """
    logger.error("OAuth error occurred")
    return redirect(f"{settings.FRONTEND_URL}/oauth/error?error=oauth_failed")