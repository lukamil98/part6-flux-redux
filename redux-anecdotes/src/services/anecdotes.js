export const getAll = async () => {
  const response = await fetch("http://localhost:3001/anecdotes") // Assuming JSON-server is running on localhost:3001
  const data = await response.json()
  return data
}

export const createAnecdote = async (content) => {
  const response = await fetch("http://localhost:3001/anecdotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, votes: 0 }),
  })
  const data = await response.json()
  return data
}

export const vote = async (id) => {
  const response = await fetch(`http://localhost:3001/anecdotes/${id}`, {
    method: "PATCH", // Change the method to PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }), // Send the ID of the anecdote to be updated
  })
  const data = await response.json()
  return data
}

export default { getAll, createAnecdote, vote }
