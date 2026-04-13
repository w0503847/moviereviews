import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import type { MovieDetails } from "../../types/MovieDetails";
import type { Review } from "../../types/Review";

export default function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieRes = await fetch(
                    `${import.meta.env.VITE_API_HOST}api/movies/${id}`
                );
                const movieData = await movieRes.json();

                const reviewRes = await fetch(
                    `${import.meta.env.VITE_API_HOST}api/moviereviews?movieId=${id}`
                );
                const reviewData = await reviewRes.json();

                console.log("MOVIE RESPONSE:", movieData);

                setMovie(movieData);
                setReviews(reviewData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="container mt-4">Loading...</div>;
    if (!movie) return <div className="container mt-4">Movie not found</div>;

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3 shadow-sm" style={{ backgroundColor: "red", borderColor: "red" }}>
                ← Back to Home
            </Link>
            <div className="row">

                {/* Poster */}
                <div className="col-md-4">
                    <img
                        src={movie.imageUrl}
                        className="img-fluid rounded shadow-sm"
                        style={{ aspectRatio: "3 / 4", objectFit: "cover" }}
                    />
                </div>

                {/* Info */}
                <div className="col-md-8">
                    <h2>
                        {movie.title}
                        {movie.averageRating !== null && (
                            <span className="text-muted ms-2">
                                ({movie.averageRating.toFixed(1)} ⭐)
                            </span>
                        )}
                    </h2>

                    <p className="mt-3">{movie.synopsis}</p>

                    <ul className="list-group mt-3 shadow-sm">
                        <li className="list-group-item">
                            <strong>Runtime:</strong> {movie.runtime} mins
                        </li>
                        <li className="list-group-item">
                            <strong>Release Date:</strong>{" "}
                            {new Date(movie.releaseDate).toLocaleDateString()}
                        </li>
                        <li className="list-group-item">
                            <strong>Genre:</strong> {movie.genre}
                        </li>
                        <li className="list-group-item">
                            <strong>Age Rating:</strong> {movie.ageRating}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-5">
                <h3>Reviews</h3>

                {reviews.length === 0 ? (
                    <p className="text-muted">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h6 className="text-muted">
                                    {review.reviewerName ?? "Anonymous"} — ⭐ {review.rating}
                                </h6>
                                <p className="mb-0">{review.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}