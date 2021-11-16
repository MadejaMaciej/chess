import axios from 'axios'

import {
    registerAddress
} from '../functions/enviroment'

export const REGISTER_REQUEST = 'register_request'
export const REGISTER_SUCCESS = 'register_success'
export const REGISTER_ERROR = 'register_error' 

export function register(username, password){
    if(registerAddress == undefined){
        var backendAddress = "http://localhost:3000/api/register"
    }else{
        var backendAddress = registerAddress
    }

    const postBody = {
        username,
        password
    }

    return async function(dispatch){
        dispatch(registerRequest())
        axios.post(backendAddress, postBody)
            .then((res) => {
                dispatch(registerSuccess(res))
            }, (e) => {
                dispatch(registerError(e))
            })
    }

    function registerRequest(){
        return {
            type: REGISTER_REQUEST
        }
    }

    function registerSuccess(res){
        return {
            type: REGISTER_SUCCESS,
            payload: res
        }
    }

    function registerError(e){
        return {
            type: REGISTER_ERROR,
            payload: {error: e}
        }
    }
}