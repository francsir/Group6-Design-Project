import models
from django.db import models

# SQL Helper Functions

# Fetches game matching a specific id
def getGameById(gameid):
    return models.Game.games.filter(id=gameid)

# Fetches all games where the specified id played
def getGamesByUser(userid):
    whiteGames = models.Game.games.filter(white=userid)
    blackGames = models.Game.games.filter(black=userid)
    return whiteGames.union(blackGames)

# Creates new game
def addGame(moves, name = None, date = None, white = None, black = None):
    newGame = models.Game(name = name, date = date, white = white, black = black, moves = moves)
    newGame.save()
    
# Updates a game with new information
def updateGame(gameid, name = None, date = None, white = None, black = None):
    game = models.Game.games.get(id=gameid)
    if (name): game.name = name
    if (date): game.date = date
    if (white): game.white = white
    if (black): game.black = black
    game.save()
