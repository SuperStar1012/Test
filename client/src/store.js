import { createStore,applyMiddleware  } from 'redux'
import thunk from "redux-thunk" 
import rootReducer from './reducer'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
 export default store