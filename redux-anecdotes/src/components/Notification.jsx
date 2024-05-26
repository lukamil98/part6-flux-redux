import { useNotification } from "../context/NotificationContext"

const Notification = () => {
  const { state } = useNotification()

  if (!state.isVisible) return null

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: state.isVisible ? "block" : "none",
  }

  return <div style={style}>{state.message}</div>
}

export default Notification
