import { useEffect, useState } from "react";
import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BoardsList from "../boardsList/boardsList";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import "./board.css"

const Board = ({setShowBoard}) => {
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [cities, setCities] = useState([])
  const [israelCities, setIsraelCities] = useState([])
  const [name, setName] = useState("") 
  const [selectedBoard, setSelectedBoard] = useState()
  const [boards, setBoards] = useState([])

	const WEATHER_API_URL = process.env.REACT_APP_API_URL;

  const getAllBoards = async () => {
    try {
			const url = `${WEATHER_API_URL}/getAllBoards`;
			let res = await fetch(url)
			const { data } = await res.json()
      if (!(data=== "Error"))
      {
			  setBoards(data)
      }
      else 
      {
        setBoards([])
      }
		}
		catch (error) {
			console.log(error)
		}
  }

  const getAllCities = async () => {
    try {
			const url = `${WEATHER_API_URL}/citiesInIsrael`;
			let res = await fetch(url)
			const data = await res.json()
			setIsraelCities(data)
		}
		catch (error) {
			console.log(error)
		}
  }

  const clearFields = () => {
    setName("");
    setCities([]);
    setShowForm(false)
    setEditMode(false)
  }

  const createNewBoard = async (data) => {
    const createProps = data
    try {
        const url = `${WEATHER_API_URL}/addBoard`;

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createProps)
        });

        if (res.ok) {
            const result = await res.json();
            clearFields();
            getAllBoards();
        } else {
            console.log('Error:', res.statusText);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const deleteBoard = async (id) => {
    try {
        const url = `${WEATHER_API_URL}/deleteBoard/${id}`;
        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
          getAllBoards();
      } else {
          console.log('Error:', res.statusText);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const editBoard = async (data) => {
    try {
      const url = `${WEATHER_API_URL}/updateBoard/${selectedBoard?.id}`;

      let res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

        if (res.ok) {
            const result = await res.json();
            clearFields();
            getAllBoards();
        } else {
            console.log('Error:', res.statusText);
        }
    } catch (error) {
        console.log(error)
    }

  }


  const onSubmit = () => {
    const data = {
      name,
      cities
    }

    editMode ? 
      editBoard(data) :
      createNewBoard(data)

    setShowForm(false)
    setEditMode(false)
  }

  const showEditForm = (board) => {
    setName(board?.name);
    setCities(board.cities);
    setEditMode(true)
    setShowForm(true)
    setSelectedBoard(board)
  }

  useEffect(() => {
    getAllBoards()
    getAllCities()
  }, [])

  return (
    <>
      {showForm &&
      <>
        <div className='addBoardText'>
          <span>
            { editMode ? 'Update Board' : "Add New Board" }
            <button className='addBoardbackButton' onClick={clearFields}> Back </button>
          </span>
        </div>
      
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1.5, width: '50ch' },
            alignItems: "center",
            alignContent: "center"
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="boardNameTextField"
            id="name"
            label="Board Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
          <br/>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Cities</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={cities}
              onChange={(e)=>{ setCities(e.target.value) }}
              input={<OutlinedInput label="Cities" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {israelCities.map((city) => (
                <MenuItem key={city} value={city}>
                  <Checkbox checked={cities.indexOf(city) > -1} />
                  <ListItemText primary={city} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button onClick={clearFields}> Cancel</Button>
            <Button onClick={onSubmit}> {!editMode ? 'Submit' : "Update" }</Button>
          </div>
        </Box>
      </>}
      { !showForm && <div>
        <BoardsList 
          boards = {boards} 
          setShowForm= {setShowForm}
          deleteBoard= {deleteBoard}
          showEditForm = {showEditForm}
          setShowBoard = {setShowBoard}
        />
      </div>
      }
    </>
  );
}

export default Board;