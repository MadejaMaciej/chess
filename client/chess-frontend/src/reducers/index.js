import { combineReducers } from 'redux'
import CheckReducer from './check-reducer'

const rootReducer = combineReducers({
    check: CheckReducer
})

export default rootReducer