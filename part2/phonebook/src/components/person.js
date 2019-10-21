import React from 'react'
import Button from './button'

const Person = ({ persons,removeNumber}) =>persons.map(person=> <p key={person.id}>{person.name} {person.number} <Button text={'delete'} id={person.id} handleDelete={removeNumber}/></p>)

export default Person