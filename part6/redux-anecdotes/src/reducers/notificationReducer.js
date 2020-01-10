const initialNotification='You can create new anecdote'

export const setnotification=(content)=>{
    return {
         type: 'NOTIFICATION' ,
         data: {content}
    }
}

const notificationReducer=(state = initialNotification, action)=>{ 
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type) {
        case 'NOTIFICATION' :
            
           return action.data.content
        default:
            return state
    }
}


export default notificationReducer