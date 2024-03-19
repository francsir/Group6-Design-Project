import models
from django.db import models

# SQL Helper Functions

def getGameById(gameid):
    return models.Games.Game.all().filter(id=gameid)

def getGamesByUser(userid):
    whiteGames = models.Games.Game.all().filter(white=userid)
    blackGames = models.Games.Game.all().filter(black=userid)
    return whiteGames.union(blackGames)

def addGame(moves, name = None, date = None, white = None, black = None):
    newGame = models.Game(name = name, date = date, white = white, black = black, moves = moves)
    newGame.save()
    
def updateGame(gameid, name = None, date = None, white = None, black = None):
    game = models.Games.Game.all().filter(id=gameid)
    if (name): game.name = name
    if (date): game.date = date
    if (white): game.white = white
    if (black): game.black = black
    game.save()
    