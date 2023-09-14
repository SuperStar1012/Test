/*
 *
 * Account reducer
 *
 */

import {
  GET_ERROR,
  SAVED_DATA,
  SECTORS_DATA,
} from './constants';

const initialState = {
  sectorsData: [],
  savedData: [],
  error: ""
};

const sectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECTORS_DATA:
      return {
        ...state,
        sectorsData: action.payload
      };
    case SAVED_DATA:
      return {
        ...state,
        savedData: action.payload
      };
    case GET_ERROR:
      return {
        ...state,
        error: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default sectorReducer;
