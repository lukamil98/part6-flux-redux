import { createContext, useReducer, useContext, useEffect } from "react"
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

  useEffect(() => {
    // Clear notification after 5 seconds if it's a failure notification
    if (state.message && state.message.startsWith("Failed to add anecdote")) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)

      // Clear the timeout if the component unmounts or if state.message changes
      return () => clearTimeout(timeoutId)
    }
  }, [state.message])

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
