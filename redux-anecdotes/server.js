import jsonServer from "json-server"
import bodyParser from "body-parser"
import db from "./db.json"

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.json())

server.patch("/anecdotes/:id", (req, res) => {
  const id = req.params.id
  const newVoteCount = req.body.votes

  // Find the anecdote with the specified id
  const anecdoteIndex = db.anecdotes.findIndex((anecdote) => anecdote.id === id)

  // If the anecdote is found, update its vote count
  if (anecdoteIndex !== -1) {
    db.anecdotes[anecdoteIndex].votes = newVoteCount
    res
      .status(200)
      .json({ message: "Anecdote vote count updated successfully" })
  } else {
    // If the anecdote is not found, respond with a 404 error
    res.status(404).json({ error: "Anecdote not found" })
  }
})


server.use(router)
server.listen(3001, () => {
  console.log("JSON Server is running")
})
