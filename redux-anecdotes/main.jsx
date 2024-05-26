import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./src/App"
import { NotificationProvider } from "./src/context/NotificationContext"
import { Provider } from "react-redux" // Import Provider from React Redux
import store from "./store" // Import your Redux store

const queryClient = new QueryClient()
const container = document.getElementById("root")
const root = createRoot(container)

// Wrap your App component with QueryClientProvider and pass the queryClient instance
// Also, wrap it with Provider and pass the Redux store
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </QueryClientProvider>
    </Provider>
  </QueryClientProvider>
)
