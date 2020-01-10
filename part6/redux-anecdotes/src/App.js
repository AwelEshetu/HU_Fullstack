import React from 'react';
import AnecdoteForm  from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList' 
import Notification from './components/Notification'
import Filter from './components/FilterAnecdote'
import { connect } from 'react-redux'

const App = (props) => {

  
  return (
    <div>
      <div>
      <h2>Anecdotes</h2>
      {props.display ? <Notification /> : ''}
      <Filter />
      <AnecdoteForm  />
      
      <AnecdoteList />
    </div>
      
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      display:state.display
  }
}

export default connect(mapStateToProps,null)(App)