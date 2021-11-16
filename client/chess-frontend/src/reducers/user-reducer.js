import {
    CHECK_ACCOUNT_ERROR,
    CHECK_ACCOUNT_REQUEST,
    CHECK_ACCOUNT_SUCCESS
} from '../actions/user-actions'

export default function userReducer(state = {  }, action){
    switch(action.type){
        case CHECK_ACCOUNT_REQUEST:
            return "Requesting account authorization"
        case CHECK_ACCOUNT_SUCCESS:
            if(action.payload.data.token){
                window.localStorage.setItem("token", action.payload.data.token)
            }
            return (action.payload.data)
        case CHECK_ACCOUNT_ERROR:
            return {status: "Not authorized"}
        default:
            return state
    }
}