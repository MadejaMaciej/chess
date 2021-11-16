import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from '../actions/login-actions'

export default function loginReducer(state = {  }, action){
    switch(action.type){
        case LOGIN_REQUEST:
            return "Requesting login"
        case LOGIN_SUCCESS:
            return (action.payload.data)
        case LOGIN_ERROR:
            return {status: "Bad login"}
        default:
            return state
    }
}