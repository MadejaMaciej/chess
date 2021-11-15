import { combineReducers } from 'redux'
import CheckReducer from './check-reducer'
import LoginReducer from './login-reducer'
import RegisterReducer from './register-reducer'

const rootReducer = combineReducers({
    check: CheckReducer,
    login: LoginReducer,
    register: RegisterReducer
})

export default rootReducer