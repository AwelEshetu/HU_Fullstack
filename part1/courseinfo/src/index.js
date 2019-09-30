import React from 'react'
import ReactDOM from 'react-dom'

const Header=(props)=>{
    return(
        <>
        <h1>{props.course}</h1>
        </>
    )
}
const Part=(props)=>{
   return (
      props.parts.map(part=>
        <>
       <p>{part.name} {part.exercises}</p>
       </>                 
    )
       
   ) 
}
const Content=(props)=>{
    return(
        <>
        <Part parts={props.parts} />
        </>
    )
}
const Total=(props)=>{
    let total=props.total.reduce((a,b)=>a+b);
    return(
        <>
        <p>Number of exercises {total}</p>
        </>
    )
}
const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course}/> 
      <Content parts={parts}/>
      <Total total={parts.map(part=>part.exercises)}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
