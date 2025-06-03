from django.shortcuts import render

# Create your views here.

# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import AadhaarEducationSerializer
from .models import AadhaarEducation


class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')
        confirm_password = data.get('confirmPassword') or data.get('confirm_password')

        if not all([name, email, phone, password, confirm_password]):
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # Optional: store phone in User's first_name or a profile model (User model has no phone field by default)
        # Here, we'll store phone in first_name for demonstration only (not recommended for real apps)
        try:
            user = User.objects.create(
                username=email,  # username required, so use email here
                email=email,
                first_name=name,
                password=make_password(password),
            )
            # If you have a UserProfile model, save phone there.
            # For now, ignore phone or customize as needed.

            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Failed to create user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Since Django User model by default uses username, and your signup uses email as username:
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # User authenticated successfully
            # You can return user info or a token here, for now, just a success message
            return Response({'message': 'Login successful', 'user': {'email': user.email, 'name': user.first_name}}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)


class AadhaarEducationCreateView(generics.CreateAPIView):
    queryset = AadhaarEducation.objects.all()
    serializer_class = AadhaarEducationSerializer
    permission_classes = [AllowAny]

