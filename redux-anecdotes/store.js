import { combineReducers, configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./src/reducers/anecdoteReducer"
import filterReducer from "./src/reducers/filterReducer"

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
