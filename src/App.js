import { Route, Routes } from "react-router-dom";
import MovieComparisonQuiz from "./pages/MovieComparisonsQuiz";
import UserMoviesPage from "./pages/UserMoviesPage";
import AddMovies from "./pages/AddMovies";
import Home from "./pages/Home";
import Links from "./components/Links";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/moviecomparisonquiz"
          element={<MovieComparisonQuiz version="standard" />}
        />
        <Route
          path="/usercomparisonquiz"
          element={<MovieComparisonQuiz version="custom" />}
        />
        <Route path="/usermovieslist" element={<UserMoviesPage />} />
        <Route path="/addmovies" element={<AddMovies />} />
      </Routes>
      <br />
      <Links />
    </div>
  );
}

export default App;
