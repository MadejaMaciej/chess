import axios from 'axios'

import {
    validAddress,
    registerAddress,
    loginAddress
} from '../functions/enviroment'

export const CHECK_ACCOUNT_REQUEST = 'check_account_request'
export const CHECK_ACCOUNT_SUCCESS = 'check_account_success'
export const CHECK_ACCOUNT_ERROR = 'check_account_error' 
export const LOGIN_REQUEST = 'login_request'
export const LOGIN_SUCCESS = 'login_success'
export const LOGIN_ERROR = 'login_error' 
export const REGISTER_REQUEST = 'register_request'
export const REGISTER_SUCCESS = 'register_success'
export const REGISTER_ERROR = 'register_error' 

export function checkIfValid(username, token, refreshToken){
    if(validAddress == undefined){
        var backendAddress = "http://localhost:3000/api/checkIfLoggedIn"
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

export function login(username, password){
    if(validAddress == undefined){
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

export function register(username, password){
    if(validAddress == undefined){
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