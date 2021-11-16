import { combineReducers } from 'redux'
import UserReducer from './user-reducer'
import LoginReducer from './login-reducer'
import RegisterReducer from './register-reducer'

const rootReducer = combineReducers({
    user: UserReducer,
    login: LoginReducer,
    register: RegisterReducer
})

export default rootReducer