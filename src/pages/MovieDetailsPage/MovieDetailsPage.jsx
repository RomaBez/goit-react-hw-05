import { Suspense, useEffect, useState, useRef } from "react";
import {
  Link,
  NavLink,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { IMG_BASE_URL } from "../../components/MovieCast/MovieCast";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backRefLink = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTIwOTc3NTBkMGQxZDgxODQwNjBkN2VmYjA5ZjNlNCIsIm5iZiI6MTcyMDg3NDgxMS43ODAwOTMsInN1YiI6IjY2OTI3NDEzNzM1ZDBkNTA5ZTZlNGI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLvA1nPav9d_CySJJxENcZuX7LhvVSwKgscOqir4wBg",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (error) return <div>{error}</div>;
  if (!movie) return <Loader />;

  return (
    <div className={css.container}>
      <Link to={backRefLink.current} className={css.backLink}>
        Go back
      </Link>
      <img
        src={`${IMG_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className={css.poster}
      />
      <ul className={css.movieInfo}>
        <li>
          <h1 className={css.movieTitle}>{movie.title}</h1>
        </li>
        <li>
          <p className={css.movieOverview}>{movie.overview}</p>
        </li>
        <li>
          <p className={css.movieStatus}>
            {movie.status} in <br></br>
            {movie.release_date}
          </p>
        </li>
      </ul>
      <nav className={css.navLinks}>
        <NavLink
          to="cast"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
