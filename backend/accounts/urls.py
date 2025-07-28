from django.urls import path, include
from .views import RegisterView, oauth_success, oauth_error

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('oauth/success/', oauth_success, name='oauth-success'),
    path('oauth/error/', oauth_error, name='oauth-error'),
]