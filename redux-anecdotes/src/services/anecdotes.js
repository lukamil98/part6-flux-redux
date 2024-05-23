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
  const newAnecdote = {
    id: anecdotes.length + 1,
    content,
    votes: 0,
  }
  anecdotes = anecdotes.concat(newAnecdote)
  return newAnecdote
}

const vote = async (id) => {
  const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id)
  if (anecdoteToChange) {
    anecdoteToChange.votes += 1
    return anecdoteToChange
  }
  return null
}

export default { getAll, createNew, vote }
