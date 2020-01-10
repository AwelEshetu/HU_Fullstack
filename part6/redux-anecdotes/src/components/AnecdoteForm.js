import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(
      createAnecdote(content)
    )
    props.store.dispatch(setnotification(`You created "${content}"`))
    props.store.dispatch(display(true))
    setTimeout(() => {
      props.store.dispatch(display(false))
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

export default AnecdoteForm

