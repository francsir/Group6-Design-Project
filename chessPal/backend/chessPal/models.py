import uuid
from django.db import models

class Test(models.Model):
    title=models.CharField(max_length=120)
    description=models.TextField()
    completed=models.BooleanField(default=False)

    def __str__(self):
        return self.title

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='uploads/')
    
class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length = 255, null = True)
    date = models.DateField(null = True)
    white = models.UUIDField(null = True)
    black = models.UUIDField(null = True)
    moves = models.JSONField()
    games = models.Manager()
    
    def __str__(self):
        return self.name
    