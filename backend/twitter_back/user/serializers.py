from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError




class RegisterSerializer(serializers.ModelSerializer):
    # password2 = serializers.CharField(max_length=30, write_only=True)

    token = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['id', 'token', 'username', 'first_name', 'last_name', 'email', 'password']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def get_token(self, obj):
        token = Token.objects.get_or_create(user=obj)[0].key
        return token
    

    def create(self, validated_data):
        email = validated_data.get('email')
        try:
            existing_user = User.objects.get(email=email)
            raise ValidationError({'email': ['A user with that email already exists']}, code=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            username = validated_data.get('username')
            first_name = validated_data.get('first_name')
            last_name = validated_data.get('last_name')
            password = validated_data.get('password')

            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
            user.save()
            profile = Profile.objects.create(user=user)
            profile.save()
            return user



class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(read_only=True)
    reposted_posts = serializers.SerializerMethodField()
    liked_posts = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'posts', 'reposted_posts', 'liked_posts', 'created_at', 'followers', 'following']
        read_only_fields = ['id', 'created_at']


    def get_reposted_posts(self, obj): 
        reposted_posts = obj.reposted_posts.all()
        return [{'id': post.id ,'content': post.content, 'author': post.author.user.username, 'created_at': post.created_at} for post in reposted_posts]

    def get_liked_posts(self, obj):
        liked_posts = obj.liked_posts.all()
        return [{'id': post.id ,'content': post.content, 'author': post.author.user.username, 'created_at': post.created_at} for post in liked_posts]

    def get_posts(self, obj):
        posts = obj.posts.all()
        return [{'id': post.id ,'content': post.content, 'author': post.author.user.username, 'created_at': post.created_at} for post in posts]