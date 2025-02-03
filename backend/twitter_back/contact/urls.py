from django.urls import path
from . import views

urlpatterns = [
    path('contact/', views.ContactAPIView.as_view(), name='contact'),
]
