### Omer Boucris ###
## ID: 314969817 ##

import requests
import uvicorn
import logging

from database import *
from boardSchema import boards_helper
from board import Board, ResponseMessage, ErrorMessage
from typing import List
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from allcities import cities


#LOGS
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# @app.middleware("http") # applied to all HTTP requests.
# async def add_cors_header(request: Request, call_next):
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
#     response.headers["Access-Control-Allow-Credentials"] = "false"
#     response.headers["Access-Control-Allow-Methods"] = "*"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     return response



################################
#                               #   
#                               #
#    Weather HTTP Requests      #
#                               #
#                               #
###############################

@app.get('/')
async def root():
    return {"message": "Welcome to my WeatherWise App by Omer Boucris"}


@app.get('/citiesInIsrael')
async def get_cities():
    return {city.name for city in cities.filter(country_code='IL')}


@app.post('/selectedCitiesWeather')
async def get_weather(selectedCities: List[str]):
    api_key = "5cbe771226f1dc86d365644b4c2b3b56"
    weather_data = {}
    for city in selectedCities:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            json_data = response.json()
            weather_data[city] = json_data
        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error occurred while getting weather data for {city}: {http_err}")
            raise HTTPException(status_code=500, detail=f"Error getting weather data for {city}")
        except Exception as err:
            logger.error(f"Error occurred while getting weather data for {city}: {err}")
            raise HTTPException(status_code=500, detail=f"Error getting weather data for {city}")
    logger.info(f"Weather data retrieved successfully for cities: {selectedCities}")
    return weather_data



@app.get('/getWeatherCity/{city}')
async def get_weather(city: str):
    api_key = "5cbe771226f1dc86d365644b4c2b3b56"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city},IL&appid={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        json_data = response.json()
        weather_data = {
            "city": json_data["name"],
            "temperature": json_data["main"]["temp"],
            "description": json_data["weather"][0]["description"],
        }
    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=500, detail=f"Error getting weather data for {city}")
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Error getting weather data for {city}")
    return weather_data


################################
#                               #   
#                               #
#    Board HTTP Requests        #
#                               #
#                               #
###############################


@app.get('/getAllBoards')
async def get_all_boards():
    boards = boards_helper(collection.find())
    if boards:
        return ResponseMessage(boards, "Boards found successfully")
    else:
        return ErrorMessage("Error", "couldn't find the boards")


@app.get("/getBoardByID/{id}")
async def get_board(id: str):
    board = collection.find({"_id": ObjectId(id)})
    if board:
        return ResponseMessage(boards_helper(board), "Board found successfully")
    else:
        return ErrorMessage("Error", "couldn't find the board with id: {}".format(id))


@app.post('/addBoard')
async def add_board(board: Board):
    new_board_id = collection.insert_one(dict(board))
    if new_board_id:
        return ResponseMessage(boards_helper(collection.find({"_id": new_board_id.inserted_id})), "New Board created successfully")
    else:
        return ErrorMessage("Error", "couldn't create a new board")



@app.put("/updateBoard/{id}")
async def update_board(id: str, board: Board):
    collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(board)})
    updated_board = collection.find({"_id": ObjectId(id)})
    if updated_board:
        return ResponseMessage(boards_helper(updated_board), "The board has been updated successfully")
    else:
        return ErrorMessage("Error", "couldn't update the board with id: {}".format(id))


@app.delete("/deleteBoard/{id}")
async def delete_board(id: str):
    board = collection.find({"_id": ObjectId(id)})
    deleted_board = collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_board:
        return ResponseMessage(id, "deleted successfully")
    else:
        return ErrorMessage("Error", "couldn't delete the with id: {}".format(id))

if __name__ == "__main__":
    # Start the server
    uvicorn.run(app, host="127.0.0.1", port=8000)