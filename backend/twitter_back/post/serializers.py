from rest_framework import serializers
from .models import Post, Comment
from user.serializers import ProfileSerializer
from user.models import Profile




class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), source='author')
    like_count = serializers.SerializerMethodField(read_only=True)
    repost_count = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'author', 'author_id', 'like_count', 'comments', 'repost_count', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_repost_count(self, obj):
        return obj.reposted_by.count()
    

    def get_comments(self, obj):
        comments = obj.comments.all()
        return [
            {
                'id': comment.id,
                'content': comment.content,
                'author': comment.author.user.username,
                'created_at': comment.created_at
            } for comment in comments
        ]


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
