import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewAnecdote } from "../services/anecdotes"
import { useNotification } from "../context/NotificationContext"

const CreateAnecdote = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"])
      dispatch({ type: "SET_NOTIFICATION", payload: "Anecdote created!" })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    },
  })

const handleCreateAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ""
  newAnecdoteMutation.mutate({ content })
}


  return (
    <form onSubmit={handleCreateAnecdote}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateAnecdote
