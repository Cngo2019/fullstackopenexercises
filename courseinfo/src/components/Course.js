import React from 'react'

const Header = ({ name }) => {
    return (
      <div>
        <b>
            <h1>{name}</h1>
        </b>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises}/>  
        )}
      </div>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <div>
          <p> {part} {exercises} </p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
  
    var sum = 0
    parts.forEach(part => {
      sum += part.exercises
    })
    return (
      <p>
        Number of exercises {sum}
      </p>
    )
  }
  
  
  const Course = ({course}) => {
    console.log(course)
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course