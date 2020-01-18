import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote ={
        content : event.target.content.value,
        author : event.target.author.value,
        info : event.target.info.value,
    } 
    
    anecdote.id = (Math.random() * 10000).toFixed(0)
    event.target.content.value = ''
    event.target.author.value = ''
    event.target.info.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`You created anecdote "${anecdote.content}"`, 5)
    
  }

  /*return (
      <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
      </>
  )*/
    return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          content
          <input name='content'  />
        </div>
        <div>
          author
          <input name='author'  />
        </div>
        <div>
          url for more info
          <input name='info' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
const mapDispatchToProps = {
    createAnecdote,
    setNotification, 
    clearNotification
}
export default connect(null,mapDispatchToProps)(AnecdoteForm)