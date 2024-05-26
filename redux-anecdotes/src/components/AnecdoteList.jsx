import PropTypes from "prop-types"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAll, vote } from "../services/anecdotes"
import { useNotification } from "../context/NotificationContext"

const AnecdoteList = ({ filter }) => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const { data: anecdotes } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  })

  const voteMutation = useMutation({
    mutationFn: (anecdote) => vote(anecdote.id, anecdote.votes + 1),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["anecdotes"])
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `You voted for '${variables.content}'`,
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    },
  })

  if (!anecdotes) {
    return <div>Loading...</div>
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const filteredAnecdotes = filter
    ? anecdotes.filter((anecdote) =>
        String(anecdote.content).toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {typeof anecdote.content === "string"
              ? anecdote.content
              : anecdote.content.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

AnecdoteList.propTypes = {
  filter: PropTypes.string, // Validate filter prop as a string
}

export default AnecdoteList
