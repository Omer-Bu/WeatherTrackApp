### Omer Boucris ###
## ID: 314969817 ##

import pytest
import unittest

from fastapi.testclient import TestClient
from board import Board
from main import app

class TestBoardModel(unittest.TestCase):
    
    def test_board_name_must_not_be_empty(self):
        with self.assertRaises(ValueError):
            Board(name='')

    def test_board_cities_must_not_be_empty(self):
        with self.assertRaises(ValueError):
            Board(name='Test Board', cities=[])

    def test_board_creation(self):
        name = 'Test Board'
        cities = ['City 1', 'City 2']
        board = Board(name=name, cities=cities)
        self.assertEqual(board.name, name)
        self.assertEqual(board.cities, cities)

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_get_cities(self):
        response = self.client.get('/citiesInIsrael')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Tel Aviv', response.json())
        self.assertIn('Jerusalem', response.json())

    def test_get_weather_city(self):
        response = self.client.get('/getWeatherCity/Tel%20Aviv')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['city'], 'Tel Aviv')
        self.assertIn('temperature', response.json())
        self.assertIn('description', response.json())

    # Custom message to print if all tests pass
    def pytest_sessionfinish(self, session, exitstatus):
        if exitstatus == pytest.ExitCode.OK:
            print("All tests passed successfully!")

if __name__ == '__main__':
    unittest.main()
