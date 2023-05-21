import React, { useEffect, useState } from 'react'
import "./weather.css"

const Weather = ({ weatherInfo }) => {
  const [weatherState, setWeatherState] = useState('')
  const { city, temperature, description } = weatherInfo

  const converKelvinToCelcius = (temp) => {
    temp = temp - 273.15
    return Number.parseFloat(temp).toFixed(2)
  }
  return (
    <>
      <div className='widget'>
        <div className='weatherIcon'>
          <i className={`wi wi-day-cloudy`}></i>
        </div>
        <div className='weatherInfo'>
          <div className='temperature'>{converKelvinToCelcius(temperature)}°C</div>
          <div className='description'>
            <div className='place'>{city}</div>
          </div>
          {/* <div className='weatherCondition'>{description}</div> */}
        </div>
        <div className='date'>{new Date().toLocaleString()}</div>
      </div> 
    </>
  )
}

export default Weather
