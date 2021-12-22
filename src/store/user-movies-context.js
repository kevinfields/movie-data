import { createContext, useState } from "react";

const UserMoviesContext = createContext({
  movielist: [],
  totalMovies: 0,
  addMovie: (userMovie) => {},
  removeMovie: (movieId) => {},
  movieStatus: (movieId) => {},
});

export function UserMoviesContextProvider(props) {
  const [userMovieList, setUserMovieList] = useState([]);
  const addMovieHandler = (userMovie) => {
    console.log("adding movie");
    setUserMovieList((prevUserMovieList) => {
      return prevUserMovieList.concat(userMovie);
    });
  };
  const removeMovieHandler = (movieId) => {
    setUserMovieList((prevUserMovieList) => {
      return prevUserMovieList.filter((movie) => movie.id !== movieId);
    });
  };
  const movieStatusHandler = (movieId) => {
    return userMovieList.some((movie) => movie.id === movieId);
  };

  const context = {
    movielist: userMovieList,
    totalMovies: userMovieList.length,
    addMovie: addMovieHandler,
    removeMovie: removeMovieHandler,
    movieStatus: movieStatusHandler,
  };

  return (
    <UserMoviesContext.Provider value={context}>
      {props.children}
    </UserMoviesContext.Provider>
  );
}

export default UserMoviesContext;
