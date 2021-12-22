import Movie from "./Movie";

const MovieList = (props) => {
  return (
    <section className="movielistcontainer">
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          date={movie.date}
          time={movie.time}
          rating={movie.rating}
          title={movie.title}
          plot={movie.plot}
        />
      ))}
    </section>
  );
};

export default MovieList;
