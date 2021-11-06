import {
    CHECK_ACCOUNT_ERROR,
    CHECK_ACCOUNT_REQUEST,
    CHECK_ACCOUNT_SUCCESS
} from '../actions/user-actions'

export default function check(state = {  }, action){
    switch(action.type){
        case CHECK_ACCOUNT_REQUEST:
            return "Requesting game creation"
        case CHECK_ACCOUNT_SUCCESS:
            return (action.payload.data)
        case CHECK_ACCOUNT_ERROR:
            return (action.payload.data)
        default:
            return state
    }
}