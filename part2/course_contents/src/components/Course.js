import React from 'react'

const Course = ({ course }) => {
  return (
    <>
    <h1>{course.name}</h1>
    {course.parts.map((part)=>
       <p key={part.id}>{part.name} {part.exercises}</p>
       )}
    </>
  )
}

export default Course