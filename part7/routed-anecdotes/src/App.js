import React, { useEffect }from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeAnecdotes ,createAnecdote} from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = (props) => {
  
  useEffect(() => {
    props.initializeAnecdotes()
  },[])

  const anecdoteById = (id) =>
    props.anecdotes.find(a => a.id === id)

  return (
    <div>
      <Router>
      <h1>Software anecdotes</h1>
      <Menu />
        <Notification />
        <Route exact path="/" render={() => <AnecdoteList anecdotes={props.anecdotes} />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/create" render={() =>props.notification ==='' ?  <AnecdoteForm  />: <Redirect to="/" /> }/>
        <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />
            }
          />
      </Router>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      anecdotes:state.anecdotes,
      notification : state.notification
  }
}
export default connect(mapStateToProps,{ initializeAnecdotes ,createAnecdote} )(App)