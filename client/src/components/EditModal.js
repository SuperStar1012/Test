import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {editData} from '../actions'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function BasicModal(props) {

  const [name,setName] = useState("");
  const [sector,setSector] = useState("");
  const [id,setID] = useState("");
  const dispatch = useDispatch();

  useEffect( () => {
    setName(props.name);
    setSector(props.sector);
    setID(props.changeID);
  },[props])

  useEffect( () => {
    setName(props.name);
    setSector(props.sector);
    setID(props.changeID);
  },[])

  const onEditData = () => {
    const data = {
      changeID: props.changeID,
      name: name,
      sector: sector
    }
    dispatch(editData(data))
    props.setVisible(false)
  }


  return (
    <div>
      <Modal
        open={props.visible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit
          </Typography>
          <div style={{marginBottom: 10}}>
            <TextField
              id="standard-multiline-flexible"
              label="Name"
              multiline
              maxRows={100}
              value={name}
              onChange={e => setName(e.target.value)}
              variant="standard"
            />
          </div>
          <TextField
            id="standard-multiline-flexible"
            label="Sector"
            multiline
            maxRows={100}
            variant="standard"
            value={sector}
            onChange={e => setSector(e.target.value)}
          />
          <div style = {{marginTop: 20,display: 'flex', flexDirection : 'row', justifyContent: 'space-between'}}> 
            <Button variant="contained" onClick={() => props.setVisible(false)}>Close</Button>
            <Button variant="contained" onClick = {() => onEditData()} >Save</Button>

          </div>
        </Box>

      </Modal>
    </div>
  );
}