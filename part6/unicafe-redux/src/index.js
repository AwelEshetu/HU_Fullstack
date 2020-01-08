import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  
  const netural=()=>{
      store.dispatch({
          type:'OK'
      })
  }

 const bad=()=>{
      store.dispatch({
          type:'BAD'
      })
  }
   
  const reset=()=>{
      store.dispatch({
          type:'ZERO'
      })
  }
  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={netural}>neutral</button>
      <button onClick={bad} >bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)