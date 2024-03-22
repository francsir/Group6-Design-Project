from django.test import TestCase
from chessPal.sql import sqlHelper

# Create your tests here.

class DatabaseTestCase(TestCase):
    def test_gamedb(self):
        moveJSON = ""
        gameID = sqlHelper.addGame(moves = moveJSON)
        self.assertEqual(sqlHelper.getGameById(gameID).moves, moveJSON)
        print()