import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter || "")
  const dispatch = useDispatch()

  console.log("Anecdotes State:", anecdotes)
  console.log("Filter State:", filter)

  if (!anecdotes) {
    return <div>Loading...</div>
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    if (!anecdote.content) return false
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    // Dispatch the notification action with a timeout and dynamic message
    dispatch(setNotificationWithTimeout(`You voted: "${content}"`, 5000))
  }

  return (
    <div>
      <Filter /> {/* Render the Filter component */}
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
