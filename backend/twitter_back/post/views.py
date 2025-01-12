from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import PostSerializer
from .models import Post

# Create your views here.

class PostListCreateAV(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostRetrieveUpdateDestroyAV(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer