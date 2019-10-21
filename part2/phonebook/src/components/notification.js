import React from 'react'

const Notification = ({ message,error }) => {
  if (message === null && error!==null) {
    return (
        <div className="error">
       {error}
       </div>
    )
  }else if(message !== null && error===null){
      return (
    <div className="notification">
      {message}
    </div>
  )
  }else{
    return (null)
}
}

export default Notification