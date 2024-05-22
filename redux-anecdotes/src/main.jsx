import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import reducer from "./reducers/anecdoteReducer"

const store = configureStore({
  reducer: reducer,
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
