// reducers.js

const initialState = {
  anecdotes: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        anecdotes: [
          ...state.anecdotes,
          { id: state.anecdotes.length + 1, content: action.payload, votes: 0 },
        ],
      }
    case "VOTE":
      return {
        ...state,
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === action.payload
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        ),
      }
    default:
      return state
  }
}

export default reducer
