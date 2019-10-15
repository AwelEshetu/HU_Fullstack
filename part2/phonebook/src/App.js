import React, { useState } from 'react'
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/addPerson';
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber]=useState('')
  
  
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
       <Filter search={handleNameSearch}/>
      <h2>add a new </h2>
      <PersonForm submitPerson={addPerson} addName={handleNameChange} addNumber={handleNumberChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
       <Person persons={persons} />
    </div>
  )
}

export default App
