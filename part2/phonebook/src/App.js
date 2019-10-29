import React, { useState,useEffect } from 'react'
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/addPerson';
import personsService from './services/persons';
import Notification from './components/notification';
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setnotificationMessage] = useState(null)
  
  useEffect(()=>{
     personsService
     .getAll()
     .then(resp=>{
         setPersons(resp)
     })
      
  },[]);
   
 //add new name and number 
 const handleNameChange=(event)=>{
   
    setNewName(event.target.value);
 }
 const handleNumberChange=(event)=>{
     setNewNumber(event.target.value);
 }
 
  const addPerson = (event) => {
    event.preventDefault()
   const personObject = {
    name: newName,
    number:newNumber,
    id:persons.length+1
  }
  let personArray=persons.map(person=>person.name);
    
	
     if(personArray.indexOf(newName)> -1){
         let personToChange=persons.find(person=>person.name===newName),
             id=personToChange.id,
             changedData={...personToChange,number:newNumber};
		
        if(personToChange.number===newNumber){
            setErrorMessage(
              `${newName} is already added to phonebook`
            )
            
            setTimeout(() => {
              setErrorMessage(null)
              
            }, 5000)
            
        }else{
            let approve=window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`);
            
            if(approve){
              personsService
             .update(id,changedData)
             .then(resp=>{
				 
                 setPersons(persons.map(person=>person.id!==id ? person: resp))
                  setnotificationMessage(
                  `Changed ${personToChange.name}'s number`
                )
                setTimeout(() => {
                  setnotificationMessage(null)
                }, 5000)

             })
            .catch(error=>{
             setErrorMessage(
              `Information of ${personToChange.name} was already removed from server`
            )
            
            setTimeout(() => {
              setErrorMessage(null)
              
            }, 5000)
            setPersons(persons.filter(person=>person.id!==id ));
             });
            }
        } 
            
       
     }else{
         personsService
         .create(personObject)
         .then(response=>{
			 
             setPersons(persons.concat(response))
              setnotificationMessage(
                  `Added ${newName} to the phonebook`
                )
                setTimeout(() => {
                  setnotificationMessage(null)
                }, 5000)
         }).catch(error=>{
			 //console.log(JSON.stringify(error.response))
			 setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
              
            }, 5000)
		 });
     }
       
      setNewName('')
      setNewNumber('') 
  }
  
  
 
 const handleDelete=(id)=>{
     //alert(JSON.stringify(persons.filter(person=>person.id===id)))
     let nameToDelete=persons.filter(person=>person.id===id)[0].name,
         approve=window.confirm(`Are you sure about deleting ${nameToDelete} ?`);
     if(approve){
         personsService
         .remove(id)
         .then(resp=>{
             setPersons(persons.filter(person=>person.id!==id))
             
         })
        
     }
   
 }
 
 const handleNameSearch=(event)=>{
     //console.log(event.target.value)
    // alert(event.target.value==='')
     let personCopy=persons.slice();
     if(event.target.value===''){
          personsService
         .getAll()
         .then(resp=>{
             setPersons(resp)
         })
     }else{
         let nameFiltered= event.target.value;
         let filteredPersons=personCopy.filter(person=>person.name.toLowerCase().startsWith(nameFiltered.toLowerCase()))
         setPersons(filteredPersons);
         
     }
 }
    
  return (
    <div>
      <h2>Phonebook</h2>
       <Notification message={notificationMessage} error={errorMessage}/>
       <Filter search={handleNameSearch}/>
      <h2>add a new </h2>
      <PersonForm submitPerson={addPerson} addName={handleNameChange} addNumber={handleNumberChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
       <Person persons={persons} removeNumber={handleDelete}/>
    </div>
  )
}

export default App
