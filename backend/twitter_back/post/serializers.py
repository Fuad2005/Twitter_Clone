from rest_framework import serializers
from .models import Post, Comment
from user.serializers import ProfileSerializer


class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'author', 'likes', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_likes(self, obj):
        return obj.likes.count()
    
    def create(self, validated_data):
        request = self.context.get('request')
        author = request.user.profile
        post = Post.objects.create(author=author, **validated_data)
        return post
    



class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'post', 'created_at']
        read_only_fields = ['id', 'created_at']
