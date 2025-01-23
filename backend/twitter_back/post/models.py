from django.db import models
from django.utils import timezone


# Create your models here.

class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey("user.Profile", on_delete=models.CASCADE, related_name="posts")
    likes = models.ManyToManyField("user.Profile", blank=True, related_name="liked_posts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        super().save(*args, **kwargs)


class Comment(models.Model):
    content = models.CharField(max_length=255)
    author = models.ForeignKey("user.Profile", on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content