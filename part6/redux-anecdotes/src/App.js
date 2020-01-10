import React from 'react';
import AnecdoteForm  from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList' 
import Notification from './components/Notification'
import Filter from './components/FilterAnecdote'
const App = (props) => {
  const store=props.store
  
  return (
    <div>
      <div>
      <h2>Anecdotes</h2>
      {store.getState().display ? <Notification store={store}/> : ''}
      <Filter store={store} />
      <AnecdoteForm store={store} />
      
      <AnecdoteList store={store} />
    </div>
      
    </div>
  )
}

export default App