
const notificationReducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.content
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}

export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, seconds*1000)
  }

}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export default notificationReducer