import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  );
const Statistics=({value,text})=>{
     return(
        <>
         <tbody>
          <tr>
          <td>{text}</td>
          <td>{value}</td>
          </tr>  
         </tbody>
        </>
    )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0),
        [neutral, setNeutral] = useState(0),
        [bad, setBad] = useState(0),
        handleGood=()=>setGood(good+1),
        handleNeutral=()=>setNeutral(neutral+1),
        handleBad=()=>setBad(bad+1),
        all=bad+good+neutral,
        average=((good-bad)/all),
        positive=(good/all)*100;
        
    
 
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
       {
       all>0 ? 
      (<>
      <h2>Statistics</h2>
      <table style={{width:'100%'}}>
       <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
      <Statistics text='all' value={all} />
      <Statistics text='average' value={average} />
      <Statistics text='positive' value={`${positive} %`} />
      </table>
      </>)
       :
      ( <>
     <h2>Statistics</h2>
     <p>No feedback given</p>
      </>)
      }
      </div>   
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
