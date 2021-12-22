import { useState, useEffect } from "react";
import axios from "axios";
import compareDates from "../functions/compareDates";
import compareLengths from "../functions/compareLengths";
import compareRatings from "../functions/compareRatings";
import MovieCard from "../styling/MovieCard";
import promptSwitcher from "../functions/promptSwitcher";

const shuffle = (array) => {
  let shuffled = array;
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};

let moviesArray = shuffle([
  "ghostbusters",
  "gremlins",
  "star-wars",
  "jaws",
  "up",
  "psycho",
  "the-birds",
  "wall-e",
  "taxi-driver",
  "antz",
  "the-wizard-of-oz",
  "interstellar",
  "mean-girls",
  "spy-kids",
  "the-godfather",
  "the-godfather-part-ii",
  "the-lion-king",
  "forrest-gump",
]);

const MovieComparisonQuiz = () => {
  const [titles, setTitles] = useState([]);
  const [dates, setDates] = useState([]);
  const [lengths, setLengths] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [correction, setCorrection] = useState(false);
  const [correctResponse, setCorrectResponse] = useState("");
  const [prompt, setPrompt] = useState("OLDER");

  const makeGuess = (e, guess) => {
    e.preventDefault();
    let correct;
    switch (prompt) {
      case "OLDER":
        correct = compareDates(dates[0], dates[1], "o");
        setCorrectResponse(
          titles[0] +
            " was released on " +
            dates[0] +
            ", while " +
            titles[1] +
            " was released on " +
            dates[1] +
            "."
        );
        break;
      case "YOUNGER":
        correct = compareDates(dates[0], dates[1], "y");
        setCorrectResponse(
          titles[0] +
            " was released on " +
            dates[0] +
            ", while " +
            titles[1] +
            " was released on " +
            dates[1] +
            "."
        );
        break;
      case "LONGER":
        correct = compareLengths(lengths[0], lengths[1], "l");
        setCorrectResponse(
          titles[0] +
            " is " +
            lengths[0] +
            ", while " +
            titles[1] +
            " is " +
            lengths[1] +
            "."
        );
        break;
      case "SHORTER":
        correct = compareLengths(lengths[0], lengths[1], "s");
        setCorrectResponse(
          titles[0] +
            " is " +
            lengths[0] +
            ", while " +
            titles[1] +
            " is " +
            lengths[1] +
            "."
        );
        break;
      case "RATED HIGHER ON IMDB":
        correct = compareRatings(ratings[0], ratings[1], "h");
        setCorrectResponse(
          titles[0] +
            " is rated " +
            ratings[0] +
            ", while " +
            titles[1] +
            " is rated " +
            ratings[1] +
            "."
        );
        break;
      case "RATED LOWER ON IMDB":
        correct = compareRatings(ratings[0], ratings[1], "l");
        setCorrectResponse(
          titles[0] +
            " is rated " +
            ratings[0] +
            ", while " +
            titles[1] +
            " is rated " +
            ratings[1] +
            "."
        );
        break;
      default:
        console.log("how");
        correct = 1;
        break;
    }

    if (correct === -1) {
      setScore(score + 1);
      alert("wow they are actually the same day");
    }
    if (dates[guess] === dates[correct]) {
      setScore(score + 1);
      setCorrection(false);
    } else {
      setCorrection(true);
    }
    const resetter = async () => {
      if (rounds <= moviesArray.length - 2) {
        setRounds(rounds + 2);
      } else {
        setRounds(0);
      }

      const movie1 = await axios(
        "http://www.omdbapi.com/?t=" + moviesArray[rounds] + "&apikey=330b8d3a"
      );
      const movie2 = await axios(
        "http://www.omdbapi.com/?t=" +
          moviesArray[rounds + 1] +
          "&apikey=330b8d3a"
      );

      setDates([
        JSON.stringify(movie1.data.Released),
        JSON.stringify(movie2.data.Released),
      ]);
      setLengths([
        JSON.stringify(movie1.data.Runtime),
        JSON.stringify(movie2.data.Runtime),
      ]);
      setRatings([
        JSON.stringify(movie1.data.Ratings[0].Value),
        JSON.stringify(movie2.data.Ratings[0].Value),
      ]);
      setTitles([
        JSON.stringify(movie1.data.Title),
        JSON.stringify(movie2.data.Title),
      ]);
      setDescriptions([
        JSON.stringify(movie1.data.Plot).slice(0, 150),
        JSON.stringify(movie2.data.Plot).slice(0, 150),
      ]);
      setPrompt(promptSwitcher(prompt));
    };
    resetter();
  };

  useEffect(() => {
    const renderInfo = async () => {
      console.log("moviesArray[0]: " + moviesArray[0]);
      console.log("moviesArray[1]: " + moviesArray[1]);

      const movie1 = await axios(
        "http://www.omdbapi.com/?t=" + moviesArray[0] + "&apikey=330b8d3a"
      );
      const movie2 = await axios(
        "http://www.omdbapi.com/?t=" + moviesArray[1] + "&apikey=330b8d3a"
      );
      console.log("movie1: " + JSON.stringify(movie1.data.Title));
      console.log("movie2: " + JSON.stringify(movie2.data.Title));
      setTitles([
        JSON.stringify(movie1.data.Title),
        JSON.stringify(movie2.data.Title),
      ]);
      setDescriptions([
        JSON.stringify(movie1.data.Plot).slice(0, 150) + "...",
        JSON.stringify(movie2.data.Plot).slice(0, 150) + "...",
      ]);
      setDates([
        JSON.stringify(movie1.data.Released),
        JSON.stringify(movie2.data.Released),
      ]);
      setRounds(0);
    };
    renderInfo();
  }, []);

  return (
    <section>
      <div className="moviequestion">
        <MovieCard>
          <h3 className="movietitle">{titles[0]}</h3>
          <p className="movieplot">{descriptions[0]}</p>
        </MovieCard>
        <button className="moviequizbutton" onClick={(e) => makeGuess(e, 0)}>
          A
        </button>
      </div>
      <div className="moviequestion">
        <MovieCard>
          <h3 className="movietitle">{titles[1]}</h3>
          <p className="movieplot">{descriptions[1]}</p>
        </MovieCard>
        <button className="moviequizbutton" onClick={(e) => makeGuess(e, 1)}>
          B
        </button>
      </div>
      <h2 id="prompt">Which one is {prompt}?</h2>
      <section id="scoring">
        <p>
          {score} / {rounds > 0 ? rounds / 2 : 0}
        </p>
        <p>{correction ? "Sorry, " : "Good Job! "}</p>
        <p id="correction">
          {correctResponse ? correctResponse : "Click to Start"}
        </p>
      </section>
    </section>
  );
};

export default MovieComparisonQuiz;
