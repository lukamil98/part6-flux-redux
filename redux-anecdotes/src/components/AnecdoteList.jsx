import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchAnecdotes, voteForAnecdote } from "../api"
import { useState } from "react"

const AnecdoteList = () => {
  const [filter, setFilter] = useState("")
  const queryClient = useQueryClient()

  const {
    data: anecdotes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["anecdotes"], // Changed queryKey to an array
    queryFn: fetchAnecdotes,
  })

  const mutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"])
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading anecdotes. Please try again later.</div>

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (id, content) => {
    mutation.mutate(id)
    alert(`You voted: "${content}"`)
  }

  return (
    <div>
      <div>
        filter <input onChange={(e) => setFilter(e.target.value)} />
      </div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            Vote
          </button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
