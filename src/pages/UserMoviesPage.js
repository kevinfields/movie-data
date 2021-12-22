import React from "react";
import { useContext } from "react";
import UserMoviesContext from "../store/user-movies-context";
import MovieList from "../components/MovieList";

const UserMoviesPage = () => {
  const moviesContext = useContext(UserMoviesContext);
  let content;

  if (moviesContext.totalMovies < 1) {
    content = <p className="nomovies">You have not added any movies.</p>;
  } else {
    content = <MovieList movies={moviesContext.movielist} />;
  }

  return (
    <section>
      <h1>Your Movies</h1>
      {content}
    </section>
  );
};

export default UserMoviesPage;
