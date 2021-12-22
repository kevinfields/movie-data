import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { UserMoviesContextProvider } from "./store/user-movies-context";

ReactDOM.render(
  <UserMoviesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserMoviesContextProvider>,
  document.getElementById("root")
);
