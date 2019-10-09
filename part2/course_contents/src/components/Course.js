import React from 'react'

const Course = ({ course,total }) => {
    console.log(total)
  return (
    <>
    <h1>{course.name}</h1>
    {course.parts.map((part)=>
       <p key={part.id}>{part.name} {part.exercises}</p>
       )}
    <h4>total of {total} exercises</h4>
    </>
  )
}

export default Course