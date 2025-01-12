from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.models import Token
from twitter_back.utils import get_serializer_class



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
        username = validated_data.get('username')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
        user.save()
        profile = Profile.objects.create(user=user)
        profile.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(read_only=True)
    reposted_posts = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'reposted_posts', 'created_at']
        read_only_fields = ['id', 'created_at']


    def get_reposted_posts(self, obj): 
        PostSerializer = get_serializer_class('post.serializers.PostSerializer')
        return PostSerializer(obj.reposted_posts.all(), many=True).data
