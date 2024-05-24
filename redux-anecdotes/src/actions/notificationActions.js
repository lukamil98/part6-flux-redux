// src/actions/notificationActions.js

export const setNotificationAction = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: message,
  }
}

export const clearNotificationAction = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}
