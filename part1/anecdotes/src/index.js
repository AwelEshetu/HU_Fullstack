import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  );
const App = () => {
    
 const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];
  const [selected,setSelected] = useState(0),
        handleAnecdote=()=>setSelected((Math.floor(Math.random() * (anecdotes.length)) + 0)),
        [votes,setVote]=useState(new Array(anecdotes.length).fill(0)),
        handleVote=()=>{
            
            votes[selected]+=1;
            
            setVote([...votes])
            
            
        },
        mostVote=Math.max(...votes),
        mostVotedAnecdote=anecdotes.filter((anecdote,index)=>votes[index]===mostVote)[0];
      
            
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text='vote' /> 
      <Button onClick={handleAnecdote} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <p> {mostVotedAnecdote}</p>
    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)

