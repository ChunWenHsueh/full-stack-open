import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[1]
}

export default NotificationContext
