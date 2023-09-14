import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getSectorsData, saveData, getSavedData } from "../actions";
import DataTable from './Table'
import ValidateModal from './Modal'


import './Content.css';
import { Button, Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";


const Content = () => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.sector.sectorsData)
  const savedData = useSelector(state => state.sector.savedData)
  const [dataSource, setDataSource] = useState([]);
  const [sectorData, setSectorData] = useState(undefined);
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [checkFlag, setCheckFlag] = useState(false);

  var space = "";

  const onSaveHandle = () => {
    var data = {
      name: name,
      sector: sector,
      checkFlag: checkFlag
    }
    if (name == "" || sector == "" || checkFlag == false) {
      setVisible(true);
    }
    else {
      dispatch(saveData(data));
    }

  }

  useEffect(() => {
    dispatch(getSectorsData());
    dispatch(getSavedData());
  }, [])


  useEffect(() => {
    if (data)
      setSectorData(data)
  }, [data])

  useEffect(() => {
    console.log("changed")
  },[savedData])

  return (
    <div className="contentSection">
      <div className="nameSection">
        <TextField
          id="standard-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}
          variant="standard"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="sectorSection">
        <select multiple size="5" className="SelectBox" onChange={e => setSector(e.target.value)}>
          {
            sectorData && sectorData.map((item, index) => {
              space = ""
              for (var i = 1; i < item.rank; i++)
                space += " "
              return (<option value={item.sector}>

                {
                  space +
                  item.sector
                }
              </option>)
            })
          }
        </select>
      </div>
      <div className="submitSection">
        <div className="agreeSection">
          <FormControlLabel control={<Checkbox onChange={(e) => { setCheckFlag(e.target.checked) }} />} label="Agree" />
        </div>
        <Button variant="contained" onClick={onSaveHandle}>Save</Button>
      </div>
      <div className="dataTable">
        <DataTable dataSource={savedData} />
      </div>
      <ValidateModal visible={visible} setVisible={setVisible} />
    </div>

  );
};


export default Content;
