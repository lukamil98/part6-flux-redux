import { useDispatch } from "react-redux"
import anecdotes from "../services/anecdotes" // Import the createNewAnecdote function from your service file
import { createAnecdote } from "../reducers/anecdoteReducer" // Import the action creator

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    // Call the createNewAnecdote function to create a new anecdote
    const newAnecdote = await anecdotes.createNewAnecdote(content)

    // Dispatch an action to update the Redux store with the new anecdote
    dispatch(createAnecdote(newAnecdote))

    event.target.anecdote.value = "" // Clear the form field after capturing the content
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm
