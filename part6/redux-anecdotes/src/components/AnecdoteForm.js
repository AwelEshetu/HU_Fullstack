import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
   
      props.createAnecdote(content)
      props.setnotification(`You created "${content}"`)
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

