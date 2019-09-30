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
      props.parts.map(({name,exercises})=>
        <>
       <p key={name}>{name} {exercises}</p>
       </>                 
    )
       
   ) 
}
const Content=({parts})=>{
    return(
        <>
        <Part parts={parts} />
        </>
    )
}
const Total=({total})=>{
    let sum=total.reduce((a,b)=>a+b);
    return(
        <>
        <p>Number of exercises {sum}</p>
        </>
    )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header course={course.name}/> 
      <Content parts={course.parts}/>
      <Total total={course.parts.map(part=>part.exercises)}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
