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
    const fetchItems = async (instance) => {
      const result = await axios(
        "http://www.omdbapi.com/?t=" + movie + "&apikey=330b8d3a"
      );
      if (!result.data.Title) {
        // if there is nothing named that
        if (instance === 1) {
          alert("no results");
          //on the first round of the function call the user is alerted
        }
        return;
      }
      setAllow(true);
      //when a movie object has been retrieved, allow it's card to appear
      console.log(JSON.stringify(result.data));
      setMovie(JSON.stringify(result.data.Title));
      setPlot(
        JSON.stringify(result.data.Plot) +
          (JSON.stringify(result.data.Plot).length > 232 ? "..." : "")
      );

      setTime(JSON.stringify(result.data.Runtime));
      setRating(JSON.stringify(result.data.Ratings[0].Value));
      setDate(JSON.stringify(result.data.Released));
      //set all state variables to the data from that object
      setSaved(moviesContext.movieStatus(JSON.stringify(result.data.Title)));
      //set saved variable dependent on whether or not the user has already
      //added the movie
    };

    //TODO: figure out whatever part of fetchItems turns the user input into
    // the closest title in the API, and add a copy of it to the front of
    // the function so that it only has to be called once.
    fetchItems(1);
    fetchItems(2);
  };

  const toggleMovieStatusHandler = () => {
    if (moviesContext.movieStatus(movie)) {
      moviesContext.removeMovie(movie);
      setSaved(false);
      //if it was saved, this button should remove it.
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
      //if it was unsaved, this button should save it
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
    //whenever the user starts typing something else, all the other data
    //should go away (assuming the new data is not another saved movie)
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
