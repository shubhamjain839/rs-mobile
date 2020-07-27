import { REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_SUCCESS,LOGIN_FAILED, AUTH_ERROR,USER_LOADED } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default (state = initialState,{type,payload}) => {
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
            }
        default:
            return state
    }
}
