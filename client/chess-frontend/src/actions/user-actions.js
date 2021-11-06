import axios from 'axios'

import {
    validAddress
} from '../functions/enviroment'

export const CHECK_ACCOUNT_REQUEST = 'check_account_request'
export const CHECK_ACCOUNT_SUCCESS = 'check_account_success'
export const CHECK_ACCOUNT_ERROR = 'check_account_error' 

export function checkIfValid(username, token, refreshToken){
    if(validAddress == undefined){
        var backendAddress = "http://localhost:3000/api/checkIfLoggedInn"
    }else{
        var backendAddress = validAddress
    }

    const postBody = {
        username,
        token,
        refreshToken
    }

    return async function(dispatch){
        dispatch(checkIfValidRequest())
        axios.post(backendAddress, postBody)
            .then((res) => {
                dispatch(checkIfValidSuccess(res))
            }, (e) => {
                dispatch(checkIfValidError(e))
            })
    }

    function checkIfValidRequest(){
        return {
            type: CHECK_ACCOUNT_REQUEST
        }
    }

    function checkIfValidSuccess(res){
        return {
            type: CHECK_ACCOUNT_SUCCESS,
            payload: res
        }
    }

    function checkIfValidError(e){
        return {
            type: CHECK_ACCOUNT_ERROR,
            payload: {error: e}
        }
    }
}