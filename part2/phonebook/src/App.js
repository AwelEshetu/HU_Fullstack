import React, { useState } from 'react'
import Person from './components/person';
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber]=useState('')
  
  const rows = () => persons.map((person,index) =>
    <Person
      key={index}
      person={person}
    />
  )
  const addPerson = (event) => {
    event.preventDefault()
   const personObject = {
    name: newName,
    number:newNumber
  }
     if(persons.map(person=>person.name).includes(newName)){
         alert(`${newName} is already added to phonebook`);
     }else{
         setPersons(persons.concat(personObject))
     }   
      setNewName('')
      setNewNumber('')
  }
  
  const handleNameChange=(event)=>{
   
    setNewName(event.target.value);
 }
 const handleNumberChange=(event)=>{
     setNewNumber(event.target.value);
 }
 
 const handleNameSearch=(event)=>{
     console.log(event.target.value)
     let personCopy=persons.slice();
     if(event.target.value!==''){
         let nameFiltered= event.target.value;
         let filteredPersons=personCopy.filter(person=>person.name.toLowerCase().startsWith(nameFiltered.toLowerCase()))
         setPersons(filteredPersons);
         
     }
 }
    
  return (
    <div>
      <h2>Phonebook</h2>
       <div>
        filter shown with : <input onChange={handleNameSearch}/>
       </div>
      <h2>add a new </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}  onChange={handleNameChange}/>
        </div>
       <div>
       number: <input value={newNumber} onChange={handleNumberChange}/>
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
