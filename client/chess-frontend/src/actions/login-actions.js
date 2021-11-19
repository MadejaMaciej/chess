import axios from 'axios'

import {
    loginAddress
} from '../functions/enviroment'

export const LOGIN_REQUEST = 'login_request'
export const LOGIN_SUCCESS = 'login_success'
export const LOGIN_ERROR = 'login_error'
export const LOGIN_DELETE = 'login_delete' 

export function login(username, password){
    if(loginAddress == undefined){
        var backendAddress = "http://localhost:3000/api/login"
    }else{
        var backendAddress = loginAddress
    }

    const postBody = {
        username,
        password
    }

    return async function(dispatch){
        dispatch(loginRequest())
        axios.post(backendAddress, postBody)
            .then((res) => {
                dispatch(loginSuccess(res))
            }, (e) => {
                dispatch(loginError(e))
            })
    }

    function loginRequest(){
        return {
            type: LOGIN_REQUEST
        }
    }

    function loginSuccess(res){
        return {
            type: LOGIN_SUCCESS,
            payload: res
        }
    }

    function loginError(e){
        return {
            type: LOGIN_ERROR,
            payload: {error: e}
        }
    }
}

export function loginDelete(){
    return async function(dispatch){
        dispatch(loginDel())
    }

    function loginDel(){
        return {
            type: LOGIN_DELETE
        }
    }
}