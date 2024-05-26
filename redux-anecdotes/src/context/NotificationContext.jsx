import { createContext, useReducer, useContext } from "react"
import PropTypes from "prop-types"

const NotificationContext = createContext()

const initialState = {
  message: null,
  isVisible: false,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, message: action.payload, isVisible: true }
    case "CLEAR_NOTIFICATION":
      return { ...state, message: null, isVisible: false }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useNotification = () => useContext(NotificationContext)
