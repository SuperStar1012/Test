import axios from 'axios';
import { GET_ERROR, SECTORS_DATA,SAVED_DATA } from './constants'
const API_URL = "http://localhost:5000/";

export const getSectorsData = () => async (dispatch) => {
    const response = await axios.get(API_URL);
    if (response) {
       
        dispatch({
            type: SECTORS_DATA,
            payload: response.data
        });
    }
    else {
        dispatch({
            type: GET_ERROR,
            payload: "No Data"
        });
    }
}
export const getSavedData = () => async (dispatch) => {
    const response = await axios.get(API_URL + "getSavedData");
    if (response) {
       
        dispatch({
            type: SAVED_DATA,
            payload: response.data
        });
    }
    else {
        dispatch({
            type: GET_ERROR,
            payload: "No Data"
        });
    }
}

export const saveData = (data) => async (dispatch) => {
    const response = await axios.post(API_URL + 'saveData',data);
    if (response) {
        dispatch({
            type: SAVED_DATA,
            payload: response.data
        });
    }
    else {
        dispatch({
            type: GET_ERROR,
            payload: "No Data"
        });
    }
}

export const editData = (data) => async (dispatch) => {
    const response = await axios.post(API_URL + 'editData',data);
    console.log(response.data)
    if (response) {
        dispatch({
            type: SAVED_DATA,
            payload: response.data
        });
    }
    else {
        dispatch({
            type: GET_ERROR,
            payload: "No Data"
        });
    }
}