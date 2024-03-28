import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
//8ca90be2

const API_URL = "http://www.omdbapi.com/?apikey=8ca90be2";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const getRandomMovie = async () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const response = await fetch(`${API_URL}&i=tt${randomNumber}`);
    const data = await response.json();
    searchMovies([data]);
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            placeholder="Search for Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchMovies(searchTerm);
              }
            }}
          />
          <img
            src={SearchIcon}
            alt="Serach"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
}
