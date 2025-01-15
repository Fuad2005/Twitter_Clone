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
        post.likes.remove(profile)
        return Response({"message": "Post unliked"}, status.HTTP_200_OK)
    post.likes.add(profile)
    return Response({"message": "Post liked"}, status.HTTP_200_OK)




@api_view(["GET"])
def repost_post(request, pk):
    profile = request.user.profile
    post = get_object_or_404(Post, pk=pk)
    if profile.reposted_posts.filter(id=post.id).exists():
        profile.reposted_posts.remove(post)
        return Response({"message": "Post unreposted"}, status.HTTP_200_OK)
    profile.reposted_posts.add(post)
    return Response({"message": "Post reposted"}, status.HTTP_200_OK)




