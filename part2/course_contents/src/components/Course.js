import React from 'react'

const Course = ({ courses,total }) => {
  return (
    <>
      {
    courses.map(course=>
    <div key={course.id}>
    <h1>{course.name}</h1>
    {course.parts.map(part=> <p key={part.id}>{part.name} {part.exercises}</p>)}
    <h4>total of {course.parts.map(part=>part.exercises).reduce((prev,next)=>prev+next)} exercises</h4>
    </div>
     )
     }
    
    </>
  )
}

export default Course