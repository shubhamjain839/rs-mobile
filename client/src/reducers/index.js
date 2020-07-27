import {combineReducers} from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
export default combineReducers({
    authReducer,
    alertReducer,
})