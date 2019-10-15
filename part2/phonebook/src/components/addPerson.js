import React from 'react'
const PersonForm=({name,number,submitPerson,addName,addNumber})=>{

  return( 
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={name}  onChange={addName}/>
        </div>
       <div>
       number: <input value={number} onChange={addNumber}/>
      </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        )
}
export default PersonForm 