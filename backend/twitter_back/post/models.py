from django.db import models

# Create your models here.

class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey("user.Profile", on_delete=models.CASCADE, related_name="posts")
    likes = models.ManyToManyField("user.Profile", blank=True, related_name="liked_posts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class Comment(models.Model):
    content = models.CharField(max_length=255)
    author = models.ForeignKey("user.Profile", on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content