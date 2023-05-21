import React, { useState } from 'react'
import WeatherInfo from './components/weatherInfo/weatherInfo'
import Board from './components/board/board'
// import CitiesList from './components/citiesList/citiesList'
import "./App.css"

const App = () => {
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div>
      <div className='container'>
        <div>
          { 
            showBoard ? 
            <Board setShowBoard = {setShowBoard} /> :
            <WeatherInfo setShowBoard = {setShowBoard} /> 
          }
        </div>
      </div>
    </div>
  )
}

export default App
