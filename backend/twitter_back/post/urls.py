from django.urls import path
from . import views

urlpatterns = [
    path("", views.PostListCreateAV.as_view(), name="post"),
    path("<int:pk>/", views.PostRetrieveUpdateDestroyAV.as_view(), name="post-detail"),
    path("like-post/<int:pk>/", views.like_post, name="like-post"),
    path("repost-post/<int:pk>/", views.repost_post, name="repost-post"),
]