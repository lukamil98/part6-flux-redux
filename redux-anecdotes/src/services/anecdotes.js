// src/services/anecdotes.js
let anecdotes = [
  { id: 1, content: "Mock Anecdote 1", votes: 0 },
  { id: 2, content: "Mock Anecdote 2", votes: 0 },
  { id: 3, content: "Mock Anecdote 3", votes: 0 },
]

const getAll = async () => {
  return anecdotes
}

const createNew = async (content) => {
  const newId =
    anecdotes.length > 0
      ? Math.max(...anecdotes.map((anecdote) => anecdote.id)) + 1
      : 1
  const newAnecdote = {
    id: newId,
    content,
    votes: 0,
  }
  const newAnecdotes = [...anecdotes, newAnecdote] // Create a new array with the new anecdote
  anecdotes = newAnecdotes // Update the anecdotes variable
  return newAnecdote
}


const vote = async (id) => {
  anecdotes = anecdotes.map((anecdote) =>
    anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
  )
  return anecdotes.find((anecdote) => anecdote.id === id)
}

export default { getAll, createNew, vote }
