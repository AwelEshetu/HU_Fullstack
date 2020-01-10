import React from 'react'
import { filter } from '../reducers/anecdoteReducer'
const Filter = (props) => {
    const store=props.store
    //console.log('store from filter ',store.getState())
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
      store.dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter