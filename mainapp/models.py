from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    blood_group = models.CharField(max_length=10, null=True, blank=True)
    height = models.CharField(max_length=10, null=True, blank=True)
    weight = models.CharField(max_length=10, null=True, blank=True)
    disease = models.TextField(null=True, blank=True)
    allergies = models.TextField(null=True, blank=True)
    medications = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

class Timeline(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_from = models.DateField()  
    date_to = models.DateField()
    hospital = models.CharField(max_length=300)
    disease = models.TextField()
    medicine = models.TextField()
    image = models.ImageField(upload_to='timeline/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)

class AIChats(models.Model):
    chat_type_choices = (('Prescription', 'Prescription'), ('Consultation', 'Consultation'), ('Substitute Medicine', 'Substitute Medicine'), ('Pregnancy', 'Pregnancy'), ('Child', 'Child'), ('Prediction', 'Prediction'))
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=chat_type_choices, null=True, blank=True)
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)