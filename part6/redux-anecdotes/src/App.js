import React from 'react';
import AnecdoteForm  from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList' 

const App = (props) => {

  return (
    <div>
      <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={props.store} />
      
      <AnecdoteList store={props.store} />
    </div>
      
    </div>
  )
}

export default App