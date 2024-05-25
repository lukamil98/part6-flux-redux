import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
