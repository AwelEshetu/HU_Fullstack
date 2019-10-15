import React from 'react'

const Person = ({ persons }) =>persons.map(person=> <p key={person.name}>{person.name} {person.number}</p>)

export default Person