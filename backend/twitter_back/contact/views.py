from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .serializers import ContactSerializer, Contact

# Create your views here.
class ContactAPIView(ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer