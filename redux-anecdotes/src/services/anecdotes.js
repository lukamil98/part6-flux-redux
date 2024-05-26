const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = async () => {
  const response = await fetch(baseUrl) // Assuming JSON-server is running on localhost:3001
  const data = await response.json()
  return data
}

// services/anecdoteService.js

export const createNewAnecdote = async (content) => {
  console.log("Content received in createNewAnecdote:", content)
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, votes: 0 }),
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error("Failed to create new anecdote")
  }
}

export const vote = async (id, newVoteCount) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: newVoteCount }), // Include the new vote count in the request body
  })
  const data = await response.json()
  return data
}

export default { getAll, createNewAnecdote, vote }
