import React from 'react'

const Button=({text,id,handleDelete})=>{
 
    return(<button  onClick={()=>handleDelete(id)}>{text}</button>)
};
export default Button;