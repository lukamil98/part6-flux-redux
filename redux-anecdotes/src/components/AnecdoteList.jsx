import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "./actionCreators/anecdoteActions"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter || "")
  const dispatch = useDispatch()

  if (!anecdotes) {
    return <div>Loading...</div>
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id))
    dispatch(setNotificationWithTimeout(`You voted: "${content}"`, 5000))
  }

  return (
    <div>
      <Filter />
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
