
# Weather Track App - By Omer Boucris
The WeatherTrack App is a FastAPI web application that provides weather information using the OpenWeatherMap API. The app allows users to get weather information for specific cities in Israel or a list of selected cities. The app also uses MongoDB to store and retrieve board data, but the functionality related to the board has been commented out.


<img src="https://static.vecteezy.com/system/resources/previews/001/500/512/non_2x/cloudy-weather-icon-free-vector.jpg" alt="alt text" width="150"/>

## Demo

[![Video](https://img.youtube.com/vi/J8uWCvW1SLQ/0.jpg)](https://www.youtube.com/watch?v=J8uWCvW1SLQ)



## Functionalities

 - Get list of all cities in Israel
 - Selected custom cities and retrieve thier weather (Display on a board)
 - Get specific city weather
 - Create new board track weather
 - Get board by ID
 - Update/Delete/Show Weathertrack board



## How to run the app

1. Install Docker on your machine.
2. Make sure that the containers name 'MongoDB' is available for use.
3. Install Git
4. Make sure that Ports 8000 & 3000 are set and available


## Instructions 

1. Open Terminal and run the following command:
   ```
   git clone https://github.com/EASS-HIT-PART-A-2022-CLASS-III/WeatherTrack.git
   ```
   
2. Navigate into the project file
   ```
   cd <Home>/WeatherTrack
   ```
   
3. Running the app:
   ```
   cd frontend/; docker build -t frontend; cd ..;
   ```
   ```
   docker-compose down && docker-compose build && docker-compose up
   ```

4. The WeatherTrack app is running now, open the browser and type:
   ```
   http://localhost:3000/ 
   ```
   * Another option: 
   ```
    http://0.0.0.0:3000
   ```

## Screenshots:

Verify Backend:

<img src="https://serving.photos.photobox.com/30932987331323fa3a94095d4ab1ffbd1eee493e3de14865ec6406bdb57eb9dd1a9a10fc.jpg" alt="alt text" width="200"/>

Verify frontend && backend:

<img src="https://i.ibb.co/10f3dQ6/Screenshot-2023-05-15-at-20-41-12.png" alt="alt text" width="400"/>
<img src="https://i.ibb.co/GfSZJm9/Screenshot-2023-05-15-at-20-40-59.png" alt="alt text" width="320"/>


##  Run unit_tests (backend validate):

1. Go into backend folder:
   ```
   cd <Home>/WeatherTrack/backend
   ```
2. Running unit tests with that following code:
   ```
   python -m unittest unit_tests.py
   ```

<img src="https://serving.photos.photobox.com/19890047c2184b9559bd8d635225f1343f06dea47d2b620ecefbdc0e2dbe3ae2b74eac1b.jpg" alt="alt text" width="500"/>


## Technologies which used in the project:

* Frontend: React

* Backend: FastAPI (Python)

* Database: MongoDB

* Microservices: docker-compose
   

## Design Diagram

      ┌───────────────────────┐                                     ****************************
      │   WeatherTrack App    │                                     *                          *
      │   (FastAPI web app)   │                                     *     By Omer Boucris      *
      └────────────┬──────────┘                                     *                          *
                  │                                                 ****************************   
         Use OpenWeatherMap API
                  │
      ┌────────────┴─────────────┐
      │          MongoDB         │
      └────────────┬─────────────┘
                  │
      ┌────────────┴────────────┐
      │       API-Routes        │
      └────────────┬────────────┘
                  │
                  │
               Unit Tests    --->    Dockerfile   --->  docker-compose.yml
                  │                      │                     │
                  ▼                      ▼                     ▼
      ┌───────────────────────┐   ┌──────────────────┐   ┌───────────────────┐
      │  FastAPI Unit Tests   │   │  WeatherTrack App│   │      MongoDB      │
      └───────────────────────┘   └──────────────────┘   └───────────────────┘
                  │                      │
                  │                      │
         Frontend (React.js)    API calls to WeatherTrack App
                  |                      |
                  ▼                      ▼
         ┌───────────────────┐     ┌──────────────────┐
         │     Weather       │◀─── │  Weather Frontend│
         └───────────────────┘     └──────────────────┘
