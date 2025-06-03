from django.urls import path
from .views import LoginAPIView,SignupAPIView,AadhaarEducationCreateView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('signup/', SignupAPIView.as_view(), name='login'),
    path('education/', AadhaarEducationCreateView.as_view(), name='education-create'),
]