/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
/* eslint-enable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { fetchAnecdotes } from "./components/actionCreators/anecdoteActions"

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  useEffect(() => {
    // Dispatch the action creator to fetch anecdotes from the backend
    dispatch(fetchAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
