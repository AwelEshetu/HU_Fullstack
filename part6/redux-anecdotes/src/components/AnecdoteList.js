import React from 'react'
import { connect } from 'react-redux'

import {vote} from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList=(props)=>{
   
    const handleClick= async (anecdote)=>{
        const updatedAnecdote = {...anecdote,votes:anecdote.votes+1}
        const newAnecdote = await anecdoteService.update(anecdote.id,updatedAnecdote)
        props.vote(newAnecdote.id)
        props.setnotification(`You voted "${newAnecdote.content}"`)
        props.display(true)
        setTimeout(() => {
          props.display(false)
         }, 5000)
    }
   return(
       <>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>handleClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </>
    ) 
}

const anecdotesToShow=({anecdotes})=>{
    
    return anecdotes.sort((prev,curr)=>curr.votes-prev.votes)
}

const mapDispatchToProps = {
    vote,
    setnotification,
    display
}

const mapStateToProps = (state) => {
  return {
      anecdotesToShow:anecdotesToShow(state),
      anecdotes:state.anecdotes
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)