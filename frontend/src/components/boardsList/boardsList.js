import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ShowBoard from './showBoard';
import "./boardsList.css"

const BoardsList = ({ boards , setShowForm, deleteBoard, showEditForm, setShowBoard}) => {
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [showBoardDetail, setShowBoardDetail] = useState(false)

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

  const showBoard = (id) => {
    setSelectedBoardId(id)
    setShowBoardDetail(true)
  }

  return (
    <>
      {!showBoardDetail && 
      <>
      <div className='boardListText'>
        <span>
          Boards List
         <button className='backButton' onClick={()=> {setShowBoard(false)}}> Back to Dashboard </button>
        </span>
      </div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {boards.map((board) => (
                <StyledTableRow key={board.id}>
                  <StyledTableCell component="th" scope="row">
                    {board.name}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() =>{showBoard(board.id)}}>Show</Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() =>{showEditForm(board)}}>Edit</Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => {deleteBoard(board.id)}}>Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
       </TableContainer>
      </Box>
      <Button onClick={()=> { setShowForm(true)}}> Add New Board </Button>
      </>
      } 
      {showBoardDetail && <ShowBoard id = {selectedBoardId} setShowBoardDetail = {setShowBoardDetail}/>}
    </>
  );
}

export default BoardsList;