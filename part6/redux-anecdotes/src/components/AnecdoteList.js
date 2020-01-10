import React from 'react'
import { connect } from 'react-redux'

import {vote} from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'

const AnecdoteList=(props)=>{
   
    const handleClick= (anecdote)=>{
        props.vote(anecdote.id)
        props.setnotification(`You voted "${anecdote.content}"`)
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