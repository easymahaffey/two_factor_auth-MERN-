import appReducer from './appReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

export default rootReducer