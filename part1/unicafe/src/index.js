import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0),
        [neutral, setNeutral] = useState(0),
        [bad, setBad] = useState(0),
        handleGood=()=>setGood(good+1),
        handleNeutral=()=>setNeutral(neutral+1),
        handleBad=()=>setBad(bad+1),
        all=bad+good+neutral,
        average=(((bad*-1)+good)/all),
        positive=(good/all)*100;
    
 const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  );
 const containerStyle={
     float:'left',
     overflow:'hidden',
    textAlign:'centre'
 }
      
  return (
    <div >
      <h1 style={{textAlign:'left'}}>Give Feedback</h1>
      <div style={containerStyle}>
      <Button onClick={handleGood} text='Good' /> 
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      <h2 >Statistics</h2>
      <p>good {good}</p>      
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>  
      <p>all {all}</p>
      <p>average {average||0}</p>
      <p>positive {positive||0} %</p>
      </div>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
