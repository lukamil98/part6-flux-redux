import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewAnecdote } from "../services/anecdotes"
import { useNotification } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const mutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"])
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "New anecdote added",
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    },
    onError: (error) => {
      console.error("An error occurred:", error.message)
      let errorMessage = error.message + ": It must be at least 5 characters long."
      dispatch({
        type: "SET_NOTIFICATION",
        payload: errorMessage,
      })
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    mutation.mutate(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
