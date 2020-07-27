import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAILED, SET_ALERT, USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED } from './types'
import setAlert from './alert'
import setAuthToken from '../util/setAuthToken'

export const loadUser = () => async dispatch=>{
    if(localStorage.token) setAuthToken(localStorage.token)
    try {
        const res = await axios.get('/api/auth/')
        dispatch({
            type:USER_LOADED,
            payload:res.data,
        })
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg,'error')))
        dispatch({
            type:AUTH_ERROR
        })
    }
}
export const loginUser = (body) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data,
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg,'error')))
        dispatch({
            type:LOGIN_FAILED,
        })
    }

}
export const registerUser = (body) => async (dispatch) => {
    // console.log('i am going to register user');
    // console.log(body);
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users/',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data,
        })
        dispatch(setAlert(res.data.msg,'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) errors.forEach( error => dispatch(setAlert(error.msg,'error')))
        dispatch({
            type:REGISTER_FAILED,
        })
    } 
}
