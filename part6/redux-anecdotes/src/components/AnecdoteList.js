import React from 'react'
import {vote} from '../reducers/anecdoteReducer'

const AnecdoteList=({store})=>{
   return(
       <>
      {store.getState().sort((prev,curr)=>curr.votes-prev.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>store.dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      </>
    ) 
}

export default AnecdoteList