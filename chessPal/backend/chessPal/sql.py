from chessPal.models import Game, Friend, FriendRequest, UserImage
from django.db import models
from django.contrib.auth.models import User

# SQL Helper Functions
class sqlHelper:
    
    # Fetches games
    @staticmethod
    def getGames(gameid):
        return Game.games.all()
    
    # Fetches game matching a specific id
    @staticmethod
    def getGameById(gameid):
        return Game.games.get(id=gameid)

    # Fetches all games where the specified id played
    @staticmethod
    def getGamesByUser(userid):
        whiteGames = Game.games.filter(white=userid)
        blackGames = Game.games.filter(black=userid)
        return whiteGames.union(blackGames)

    # Creates new game
    @staticmethod
    def addGame(moves, name = None, date = None, white = None, black = None, victor = None,):
        newGame = Game(name = name, date = date, white = white, black = black, moves = moves, victor = victor)
        newGame.save()
        return newGame.id
        
    # Updates a game with new information
    @staticmethod
    def updateGame(gameid, name = None, date = None, white = None, black = None):
        game = Game.games.get(id=gameid)
        if (name): game.name = name
        if (date): game.date = date
        if (white): game.white = white
        if (black): game.black = black
        game.save()
        
    # Gets a username by userid
    @staticmethod
    def getUsernameById(userid):
        return User.objects.get(pk=userid).username

    # Gets a userid by username
    @staticmethod
    def getUserByUsername(username):
        return User.objects.get(username=username).pk

    # Finds all follows originating from the given user id  
    @staticmethod  
    def getFriends(userid):
        oFriends = Friend.friends.filter(origin=userid)
        tFriends = Friend.friends.filter(target=userid)
        return oFriends.union(tFriends)
    
    # Get Friend Requests targetting a user
    @staticmethod
    def getFriendRequests(userid):
        return FriendRequest.friendrequests.filter(target=userid)

    # Finds a specific friend item
    @staticmethod
    def getFriendItem(originid, targetid):
        return Friend.friends.get(origin=originid, target=targetid) 

    # Creates a new friend request
    @staticmethod
    def createFriendRequest(originid, targetid):
        newRequest = FriendRequest(origin = originid, target = targetid)
        newRequest.save()
    
    # Accepts a friend request
    @staticmethod
    def acceptFriendRequest(originid, targetid):
        request = FriendRequest.friendrequests.filter(origin = originid, target = targetid)
        request.delete()
        newFriend = Friend(origin = originid, target = targetid)
        newFriend.save()        
        
    # Denys a friend request
    @staticmethod
    def acceptFriendRequest(originid, targetid):
        request = FriendRequest.friendrequests.filter(origin = originid, target = targetid)
        request.delete()      
        
    @staticmethod
    def createImage(userid, image):
        newImage= UserImage(user = userid, image = image)
        newImage.save()
    
    @staticmethod
    def updateImage(userid, newImage):
        editedImage = UserImage.userImages.get(user=userid)
        editedImage.image = newImage
        editedImage.save()
    
    @staticmethod 
    def getImage(userid):
        image = UserImage.userImages.get(user=userid)
        return image