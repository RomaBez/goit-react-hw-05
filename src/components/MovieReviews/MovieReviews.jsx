import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviewsList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTIwOTc3NTBkMGQxZDgxODQwNjBkN2VmYjA5ZjNlNCIsIm5iZiI6MTcyMDg3NDgxMS43ODAwOTMsInN1YiI6IjY2OTI3NDEzNzM1ZDBkNTA5ZTZlNGI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLvA1nPav9d_CySJJxENcZuX7LhvVSwKgscOqir4wBg",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError(true);
      }
    };
    fetchReviewsList();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews:</h2>
      {error && <ErrorMessage />}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
