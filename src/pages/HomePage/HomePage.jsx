import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTIwOTc3NTBkMGQxZDgxODQwNjBkN2VmYjA5ZjNlNCIsIm5iZiI6MTcyMDg3NDgxMS43ODAwOTMsInN1YiI6IjY2OTI3NDEzNzM1ZDBkNTA5ZTZlNGI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLvA1nPav9d_CySJJxENcZuX7LhvVSwKgscOqir4wBg",
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovieList();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Top Rated Films</h1>
      <MovieList movies={movies} />
    </div>
  );
}
