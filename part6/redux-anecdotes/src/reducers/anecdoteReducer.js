

//const getId = () => (100000 * Math.random()).toFixed(0)



export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}
export const vote=(id)=>{
    console.log('id from vote atction ',id)
    return {
        type: 'VOTE' ,
        data: { id }
    }
}
export const filter=(query)=>{
    return {
        type: 'FILTER',
        data:{query}
    }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
    switch(action.type) {
        case 'NEW_ANECDOTE':
            return [...state,action.data]
        case 'INIT_ANECDOTES' :
            return action.data
        case 'VOTE':
          console.log('id from VOTE case',action.data.id)
          const id = action.data.id
          const anecdoteToChange = state.find(n => n.id === id)
          console.log('note to be voted from VOTE case',anecdoteToChange)
          const changedAnecdote = { 
            ...anecdoteToChange, 
            votes:anecdoteToChange.votes+1
          }
          return state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote 
          )
        case 'FILTER':
            const query = action.data.query
            return state.filter(anecdote=>anecdote.content.includes(query))
        default:
            return state
    }
}

export default anecdoteReducer