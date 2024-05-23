/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
/* eslint-enable no-unused-vars */
import { useDispatch } from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  ) 
}

export default App
