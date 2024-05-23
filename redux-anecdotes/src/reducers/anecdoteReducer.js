// src/reducers/anecdoteReducer.js
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
        state.sort((a, b) => b.votes - a.votes)
      }
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
