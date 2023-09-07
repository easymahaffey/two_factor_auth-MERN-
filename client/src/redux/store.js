import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(()=>{
    sessionStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store;