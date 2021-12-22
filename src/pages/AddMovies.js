import React from "react";
import { useContext, useState, useEffect } from "react";
import UserMoviesContext from "../store/user-movies-context";
import axios from "axios";

const AddMovies = () => {
  const moviesContext = useContext(UserMoviesContext);

  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");
  const [plot, setPlot] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saved, setSaved] = useState(false);
  const [allow, setAllow] = useState(false);

  const lookUp = () => {
    const fetchItems = async () => {
      const result = await axios(
        "http://www.omdbapi.com/?t=" + movie + "&apikey=330b8d3a"
      );
      if (!result.data.Title) return;
      setAllow(true);
      console.log(JSON.stringify(result.data));
      setMovie(JSON.stringify(result.data.Title));
      setPlot(JSON.stringify(result.data.Plot));
      setTime(JSON.stringify(result.data.Runtime));
      setRating(JSON.stringify(result.data.Ratings[0].Value));
      setDate(JSON.stringify(result.data.Released));
      setSaved(moviesContext.movieStatus(JSON.stringify(result.data.Title)));
    };
    fetchItems();
  };

  const toggleMovieStatusHandler = () => {
    if (moviesContext.movieStatus(movie)) {
      moviesContext.removeMovie(movie);
      setSaved(false);
    } else {
      moviesContext.addMovie({
        id: movie,
        title: movie,
        plot: plot,
        time: time,
        rating: rating,
        date: date,
      });
      setSaved(true);
      console.log(movie);
    }
  };

  useEffect(() => {
    if (!moviesContext.movieStatus(movie)) {
      setSaved(false);
      setPlot("");
      setTime("");
      setRating("");
      setDate("");
      setAllow(false);
    }
  }, [movie, moviesContext]);

  return (
    <section>
      <div>Add movies to your personal quiz by searching them below.</div>
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="enter movie here"
        id="movieinput"
      />
      <button id="moviesearchbutton" onClick={() => lookUp()}>
        Look Up
      </button>
      <section
        className={saved ? "savedfactscontainer" : "moviefactscontainer"}
      >
        {allow ? (
          <>
            <p className="moviedetail">{movie}</p>
            <p className="moviedetail">{rating}</p>
            <p className="moviedetail">{date}</p>
            <p className="moviedetail">{time}</p>
            <p id="movieplot">{plot}</p>
            <button onClick={() => toggleMovieStatusHandler()}>
              {saved ? "Remove Movie" : "Add Movie"}
            </button>
          </>
        ) : null}
      </section>
    </section>
  );
};

export default AddMovies;
