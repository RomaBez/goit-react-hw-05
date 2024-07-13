import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCastList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTIwOTc3NTBkMGQxZDgxODQwNjBkN2VmYjA5ZjNlNCIsIm5iZiI6MTcyMDg3NDgxMS43ODAwOTMsInN1YiI6IjY2OTI3NDEzNzM1ZDBkNTA5ZTZlNGI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLvA1nPav9d_CySJJxENcZuX7LhvVSwKgscOqir4wBg",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Failed to fetch cast list", error);
      }
    };
    fetchCastList();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              height={250}
              width={250}
            />
            <p>
              {actor.name} as {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
