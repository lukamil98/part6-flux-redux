export const voteAnecdote = (id) => ({
  type: "VOTE",
  payload: id,
})

export const createAnecdote = (content) => ({
  type: "CREATE",
  payload: content,
})
