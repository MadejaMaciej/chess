import { 
    user
} from '../actions/user-actions'

import {
    login
} from '../actions/login-actions'

import {
    register
} from '../actions/register-actions'

export function mapStateToProps(state){
    return {
        userState: state.user,
        loging: state.login,
        registering: state.register
    }
}

export const mapDispatchToProps = { user, login, register }