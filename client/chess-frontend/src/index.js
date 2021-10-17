import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

import { App } from './components/App'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

ReactDOM.render( 
<Provider store={createStoreWithMiddleware(reducers)}>
    <App />
</ Provider>, document.getElementById('root'))