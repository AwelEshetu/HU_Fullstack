import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  );
const Statistics=({bad,good,neutral})=>{
    const all=bad+good+neutral,
        average=((good-bad)/all),
        positive=(good/all)*100;
    if(all>0){
     return(
        <>
      <h2 >Statistics</h2>
      <p>good {good}</p>      
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>  
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
        </>
    )
        
    }else{
        return(
            <>
            <h2 >Statistics</h2>
            <p>No feedback given</p>
            </>
        )  
}
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0),
        [neutral, setNeutral] = useState(0),
        [bad, setBad] = useState(0),
        handleGood=()=>setGood(good+1),
        handleNeutral=()=>setNeutral(neutral+1),
        handleBad=()=>setBad(bad+1);
        
    
 
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
      <Statistics bad={bad} good={good} neutral={neutral}/>
      </div>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
