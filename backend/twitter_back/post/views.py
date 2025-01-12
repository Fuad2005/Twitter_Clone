from django.shortcuts import render
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
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


@api_view(["GET"])
def like_post(request, pk):
    profile = request.user.profile
    post = get_object_or_404(Post, pk=pk)
    if post.likes.filter(id=profile.id).exists():
        return Response({"error": "Already liked"}, status.HTTP_400_BAD_REQUEST)
    post.likes.add(profile)
    return Response({"message": "Post liked"}, status.HTTP_201_CREATED)


@api_view(["GET"])
def unlike_post(request, pk):
    profile = request.user.profile
    post = get_object_or_404(Post, pk=pk)
    if not post.likes.filter(id=profile.id).exists():
        return Response({"error": "Not liked"}, status.HTTP_400_BAD_REQUEST)
    post.likes.remove(profile)
    return Response({"message": "Post unliked"}, status.HTTP_201_CREATED)


@api_view(["GET"])
def repost_post(request, pk):
    profile = request.user.profile
    post = get_object_or_404(Post, pk=pk)
    if profile.reposted_posts.filter(id=post.id).exists():
        return Response({"error": "Already reposted"}, status.HTTP_400_BAD_REQUEST)
    profile.reposted_posts.add(post)
    return Response({"message": "Post reposted"}, status.HTTP_201_CREATED)


@api_view(["GET"])
def unrepost_post(request, pk):
    profile = request.user.profile
    post = get_object_or_404(Post, pk=pk)
    if not profile.reposted_posts.filter(id=post.id).exists():
        return Response({"error": "Not reposted"}, status.HTTP_400_BAD_REQUEST)
    profile.reposted_posts.remove(post)
    return Response({"message": "Post unreposted"}, status.HTTP_201_CREATED)