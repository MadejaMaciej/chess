import { 
    user
} from '../actions/user-actions'

import {
    login,
    loginDelete
} from '../actions/login-actions'

import {
    register,
    registerDelete
} from '../actions/register-actions'

export function mapStateToProps(state){
    return {
        userState: state.user,
        loging: state.login,
        registering: state.register
    }
}

export const mapDispatchToProps = { user, login, loginDelete, register, registerDelete }