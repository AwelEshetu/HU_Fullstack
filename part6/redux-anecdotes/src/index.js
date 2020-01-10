import React from 'react'
import ReactDOM from 'react-dom'
import { createStore ,combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import displayReducer from './reducers/displayReducer'
import { Provider } from 'react-redux'
const reducer=combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    display:displayReducer
})

const store = createStore(reducer)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)