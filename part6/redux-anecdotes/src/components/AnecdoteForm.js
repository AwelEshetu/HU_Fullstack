import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
      props.createAnecdote(newAnecdote)
      props.setnotification(`You created "${newAnecdote.content}"`)
      props.display(true)
    setTimeout(() => {
      props.display(false)
     }, 5000)
    
  }

  return (
      <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
      </>
  )
}
const mapDispatchToProps = {
    createAnecdote,
    setnotification,
    display
}
export default connect(null,mapDispatchToProps)(AnecdoteForm)

