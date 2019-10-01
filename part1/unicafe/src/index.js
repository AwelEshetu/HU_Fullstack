import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0),
        [neutral, setNeutral] = useState(0),
        [bad, setBad] = useState(0),
        handleGood=()=>setGood(good+1),
        handleNeutral=()=>setNeutral(neutral+1),
        handleBad=()=>setBad(bad+1);
 const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  );
 const containerStyle={
     float:'left',
     width:'4%',
     textAlign:'center'
 }
      
  return (
    <div >
      <h1 style={{textAlign:'left'}}>Give Feedback</h1>
      <div style={containerStyle}>
      <Button onClick={handleGood} text='Good' /> 
      <p>{good}</p>
      </div>
      <div style={containerStyle}>
      <Button onClick={handleNeutral} text='Neutral' />
      <p>{neutral}</p>
      </div>
      <div style={containerStyle}>
      <Button onClick={handleBad} text='Bad' />
      <p>{bad}</p>
      </div>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
