import React, { useState,useEffect } from 'react'
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/addPerson';
import axios from 'axios';
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber]=useState('')
  
  useEffect(()=>{
      axios
         .get('http://localhost:3001/persons')
         .then(resp => {
        setPersons(resp.data)
        })
      
  },[]);
    
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
