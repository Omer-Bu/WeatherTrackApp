import React from 'react'
import { useState, useEffect}from 'react'

import './weatherInfo.css'
import Weather from '../weather/weather'
import { Button } from '@mui/material'

const WeatherInfo = ({setShowBoard}) => {
  const [searchValue, setSearchValue] = useState('Haifa')
  const[weatherInfo, setWeatherInfo] = useState({})
	const WEATHER_API_URL = process.env.REACT_APP_API_URL;

  const getWeatherInfo = async () => {
		try {
			const url = `${WEATHER_API_URL}/getWeatherCity/${searchValue}`;
			let res = await fetch(url)
			let data = await res.json()
			setWeatherInfo(data)
		}
		catch (error) {
			console.log(error)
		}
  }

  useEffect(() => {
    getWeatherInfo()
  }, [])

  return (
		<>
			<div className='wrap'>
				<div className='search'>
					<input 
						type="search"
						placeholder='Search....'
						autoFocus
						id='search'
						className='searchTerm'
						value={searchValue}
						onChange={(e)=>setSearchValue(e.target.value)}
					/>
					<button className='searchButton'
						type="button"
						onClick={getWeatherInfo}>
							Search
					</button>
					<button className='boardButton' 
						type="button"
			 			onClick={()=> { setShowBoard(true)}}> 
							Boards 
						</button>
				</div>
			</div>
			
			<Weather weatherInfo = {weatherInfo}/>
		</>
  )
}

export default WeatherInfo;
