from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default='viewer')

    class Meta:
        model = User
        fields = ['email', 'password', 'role']

    def create(self, validated_data):
        # Extract role explicitly
        role = validated_data.pop('role', 'viewer')
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=role
        )

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['role'] = user.role
        return token