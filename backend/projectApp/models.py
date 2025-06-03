from django.db import models
from django.contrib.auth.models import User  # import User model

class AadhaarEducation(models.Model):
    aadhaar_number = models.CharField(max_length=14)
    aadhaar_file = models.FileField(upload_to='aadhaar_files/')
    board = models.CharField(max_length=50)
    student_class = models.CharField(max_length=10)
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    marksheet_file = models.FileField(upload_to='marksheets/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.aadhaar_number} - {self.user.username}"
