import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location.pathname + location.search }}
            className={css.movieLink}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
