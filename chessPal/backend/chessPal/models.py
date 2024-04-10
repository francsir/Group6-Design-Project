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
    white = models.PositiveIntegerField(null = True)
    black = models.PositiveIntegerField(null = True)
    RESULT_WHITE_WIN = "WH"
    RESULT_BLACK_WIN = "BL"
    RESULT_DRAW = "DR"
    RESULT_CHOICES = {RESULT_WHITE_WIN: "White", RESULT_BLACK_WIN: "Black", RESULT_DRAW: "Draw"}
    result = models.CharField(max_length=2, choices = RESULT_CHOICES, default = RESULT_WHITE_WIN)
    moves = models.JSONField()
    games = models.Manager()
    
    def __str__(self):
        return self.name
    
class Friend(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    origin = models.PositiveIntegerField()
    target = models.PositiveIntegerField()
    friends = models.Manager()
    
class FriendRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    origin = models.PositiveIntegerField()
    target = models.PositiveIntegerField()
    friendrequests = models.Manager()

class UserImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.PositiveIntegerField()
    image = models.ImageField(upload_to='userImages/')
    userImages = models.Manager()