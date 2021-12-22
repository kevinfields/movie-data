import { useContext } from "react";
import UserMoviesContext from "../store/user-movies-context";
import MovieCard from "../styling/MovieCard";

const Movie = (props) => {
  const moviesContext = useContext(UserMoviesContext);
  const movieStatus = moviesContext.movieStatus(props.id);

  const toggleMovieStatusHandler = () => {
    if (movieStatus) {
      moviesContext.removeMovie(props.id);
    } else {
      moviesContext.addMovie({
        id: props.id,
        title: props.title,
        description: props.description,
        time: props.time,
        date: props.date,
        rating: props.rating,
      });
      console.log(props.id);
    }
  };
  return (
    <MovieCard>
      <section>
        <div>
          <p className="moviedetail">Title: {props.title}</p>
          <p className="moviedetail">Length: {props.time}</p>
          <p className="moviedetail">Release Date: {props.date}</p>
          <p className="moviedetail">Rating: {props.rating}</p>
          <p id="moviecardplot">Description: {props.plot}</p>
          <button className="usewordbutton" onClick={toggleMovieStatusHandler}>
            {movieStatus ? "Remove from Quiz" : "Add to Quiz"}
          </button>
        </div>
      </section>
    </MovieCard>
  );
};

export default Movie;
