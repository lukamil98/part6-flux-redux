import { createSlice } from "@reduxjs/toolkit"
import { setNotificationWithTimeout } from "./notificationReducer"
import axios from "axios"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
        state.sort((a, b) => b.votes - a.votes) // Sort anecdotes by votes
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/anecdotes", {
        content,
        votes: 0,
      })
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
      const anecdote = await axios.get(`http://localhost:3001/anecdotes/${id}`)
      const updatedAnecdote = {
        ...anecdote.data,
        votes: anecdote.data.votes + 1,
      }
      await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)
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

export default anecdoteSlice.reducer
