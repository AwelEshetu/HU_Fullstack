import React, { useState } from 'react'
import Person from './components/person';
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )
  const addPerson = (event) => {
    event.preventDefault()
   const personObject = {
    name: newName
  }

  setPersons(persons.concat(personObject))
  setNewName('')
  }
  
  const handlePersonChange=(event)=>{
   
    setNewName(event.target.value);
 }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}  onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <>
        {rows()}
       </>
    </div>
  )
}

export default App
