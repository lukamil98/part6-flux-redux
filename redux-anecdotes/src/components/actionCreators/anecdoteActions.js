import axios from "axios"
import {
  createAnecdote,
  voteAnecdote,
  setAnecdotes,
} from "../../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../../reducers/notificationReducer"

const baseUrl = "http://localhost:3001/anecdotes"

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseUrl)
      dispatch(setAnecdotes(response.data))
    } catch (error) {
      console.error("Failed to fetch anecdotes:", error.message)
      dispatch(
        setNotificationWithTimeout("Failed to fetch anecdotes", 5000, "error")
      )
    }
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(baseUrl, { content, votes: 0 })
      dispatch(createAnecdote(response.data))
      dispatch(
        setNotificationWithTimeout(`Created new anecdote: "${content}"`, 5000)
      )
    } catch (error) {
      console.error("Failed to create new anecdote:", error.message)
      dispatch(
        setNotificationWithTimeout(
          "Failed to create new anecdote",
          5000,
          "error"
        )
      )
    }
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    try {
      const anecdote = await axios.get(`${baseUrl}/${id}`)
      const updatedAnecdote = {
        ...anecdote.data,
        votes: anecdote.data.votes + 1,
      }
      await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
      dispatch(voteAnecdote(id))
      dispatch(
        setNotificationWithTimeout(`Voted for anecdote with id: ${id}`, 5000)
      )
    } catch (error) {
      console.error("Failed to vote for anecdote:", error.message)
      dispatch(
        setNotificationWithTimeout("Failed to vote for anecdote", 5000, "error")
      )
    }
  }
}
