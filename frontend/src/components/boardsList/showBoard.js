import * as React from 'react';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./showBoard.css"


const ShowBoard = ({id , setShowBoardDetail}) => {
  const [board, setBoard] = useState({})
  const [cities, setCities] = useState([])
  const [citiesData, setCitiesData] = useState([])
	const WEATHER_API_URL = process.env.REACT_APP_API_URL

  const getBoardInfo = async () => {
		try {
			const url = `${WEATHER_API_URL}/getBoardByID/${id}`;
			let res = await fetch(url)
			let {data} = await res.json()
			setBoard(data[0])
      setCities(data[0].cities)
		}
		catch (error) {
			console.log(error)
		}
  }

  const getWeatherCities = async () => {
   try {
      const url = `${WEATHER_API_URL}/selectedCitiesWeather`;
      let res = await fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cities)
        });

        if (res.ok) {
            const result = await res.json();
            setCitiesData(Object.values(result))
        } else {
            console.log('Error:', res.statusText);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    getBoardInfo()
  }, [])

   useEffect(() => {
    if(cities.length > 0) {
      getWeatherCities()
    }
  }, [cities])

  const goBackToList = () => {
    setShowBoardDetail(false)
  }

  return ( 
    <>
      <div className="boardName">
        {board?.name}
        <button className='showBackButton' onClick={()=> {goBackToList(false)}}> Back </button>
      </div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                  <TableCell>
                    <b>City Name </b>
                  </TableCell>
                 <TableCell>
                    <b>Temperature</b>
                  </TableCell>
                  <TableCell>
                    <b>Description  </b>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { citiesData?.map((city) => (
                <StyledTableRow key={city["name"]}>
                  <StyledTableCell component="th" scope="row">
                    {city["name"]}
                  </StyledTableCell>
                   <StyledTableCell component="th" scope="row">
                    {city["main"]["temp"]}
                  </StyledTableCell>
                   <StyledTableCell component="th" scope="row">
                    {city["weather"][0]["description"]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default ShowBoard;