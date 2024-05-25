// api.js

import axios from "axios"

const API_URL = "http://localhost:3001/anecdotes"

export const fetchAnecdotes = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Error fetching anecdotes:", error)
    throw error
  }
}

export const voteForAnecdote = async (id) => {
  try {
    const anecdote = await axios.get(`${API_URL}/${id}`)
    const updatedAnecdote = {
      ...anecdote.data,
      votes: anecdote.data.votes + 1,
    }
    const response = await axios.put(`${API_URL}/${id}`, updatedAnecdote)
    return response.data
  } catch (error) {
    console.error("Error voting for anecdote:", error)
    throw error
  }
}
