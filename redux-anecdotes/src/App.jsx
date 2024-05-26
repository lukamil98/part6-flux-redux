import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const queryClient = new QueryClient()

const App = () => {
  const [filter, setFilter] = useState("") // State to store filter value

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Notification />
        <Filter setFilter={setFilter} /> {/* Pass setFilter function */}
        <AnecdoteForm />
        <AnecdoteList filter={filter} /> {/* Pass filter value */}
      </div>
    </QueryClientProvider>
  )
}

export default App
