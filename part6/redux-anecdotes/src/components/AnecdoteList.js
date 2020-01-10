import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
import { display }  from '../reducers/displayReducer'
const AnecdoteList=({store})=>{
    const {anecdotes}=store.getState()
    const handleClick=(anecdote)=>{
        store.dispatch(vote(anecdote.id))
        store.dispatch(setnotification(`You voted "${anecdotes.find(selected=>selected.id===anecdote.id).content}"`))
        store.dispatch(display(true))
        setTimeout(() => {
          store.dispatch(display(false))
         }, 5000)
    }
   return(
       <>
      {anecdotes.sort((prev,curr)=>curr.votes-prev.votes).map(anecdote =>
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

export default AnecdoteList