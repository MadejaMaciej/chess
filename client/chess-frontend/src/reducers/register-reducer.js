import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from '../actions/user-actions'

export default function register(state = {  }, action){
    switch(action.type){
        case REGISTER_REQUEST:
            return "Requesting registration"
        case REGISTER_SUCCESS:
            return (action.payload.data)
        case REGISTER_ERROR:
            return {status: "Registration fail"}
        default:
            return state
    }
}