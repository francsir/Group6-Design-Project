from chessPal.models import Game, Follow, UserImage
from django.db import models

# SQL Helper Functions
class sqlHelper:
    # Fetches game matching a specific id
    def getGameById(gameid):
        return Game.games.get(id=gameid)

    # Fetches all games where the specified id played
    def getGamesByUser(userid):
        whiteGames = Game.games.filter(white=userid)
        blackGames = Game.games.filter(black=userid)
        return whiteGames.union(blackGames)

    # Creates new game
    def addGame(moves, name = None, date = None, white = None, black = None):
        newGame = Game(name = name, date = date, white = white, black = black, moves = moves)
        newGame.save()
        return newGame.id
        
    # Updates a game with new information
    def updateGame(gameid, name = None, date = None, white = None, black = None):
        game = Game.games.get(id=gameid)
        if (name): game.name = name
        if (date): game.date = date
        if (white): game.white = white
        if (black): game.black = black
        game.save()

    # Finds all follows originating from the given user id    
    def getFollows(userid):
        return Follow.follows.filter(origin=userid)

    # Finds all follows targetting the given user id
    def getFollowers(userid):
        return Follow.follows.filter(target=userid)

    # Finds a specific follow
    def getFollow(originid, targetid):
        return Follow.follows.get(origin=originid, target=targetid) 

    # Creates a new follow
    def addFollow(originid, targetid):
        newFollow = Follow(origin = originid, target = targetid)
        newFollow.save()
        
    def removeFollowById(followid):
        target = Follow.follows.get(id=followid)
        target.delete()
        
    def removeFollowByUsers(originid, targetid):
        target = Follow.follows.get(origin=originid, target=targetid)
        target.delete()
        
    def createImage(userid, image):
        newImage= UserImage(user = userid, image = image)
        newImage.save()
        
    def updateImage(userid, newImage):
        editedImage = UserImage.userImages.get(user=userid)
        editedImage.image = newImage
        editedImage.save()
        
    def getImage(userid):
        image = UserImage.userImages.get(user=userid)
        return image