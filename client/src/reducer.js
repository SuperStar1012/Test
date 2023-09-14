import { combineReducers } from 'redux'

import sector from './sectorReducer'

const createReducer = combineReducers({ sector });
export default createReducer;