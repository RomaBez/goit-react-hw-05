import axios from "axios";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      searchMovies(queryParam);
    }
  }, [searchParams]);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setError("Please enter a search movie!");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTIwOTc3NTBkMGQxZDgxODQwNjBkN2VmYjA5ZjNlNCIsIm5iZiI6MTcyMDg3NDgxMS43ODAwOTMsInN1YiI6IjY2OTI3NDEzNzM1ZDBkNTA5ZTZlNGI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLvA1nPav9d_CySJJxENcZuX7LhvVSwKgscOqir4wBg",
          },
          params: {
            query,
          },
        }
      );

      if (response.data.results.length === 0) {
        setError("No results found for your search! Please try again.");
      } else {
        setMovies(response.data.results);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
    searchMovies(query);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your movie..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          <PiYoutubeLogoFill size={12} />
        </button>
      </form>

      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
}
