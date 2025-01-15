from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    reposted_posts = models.ManyToManyField('post.Post', blank=True, related_name="reposted_by")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    def follow(self, profile):
        self.following.add(profile)
        profile.followers.add(self)

    def unfollow(self, profile):
        self.following.remove(profile)
        profile.followers.remove(self)

    def is_following(self, profile):
        return self.following.filter(id=profile.id).exists()

    def is_followed_by(self, profile):
        return self.followers.filter(id=profile.id).exists()

    