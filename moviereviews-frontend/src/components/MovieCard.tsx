import { Link } from "react-router";
import type { Movie } from "../types/Movie";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="card h-100 shadow-sm">
            
            {/* Poster Image */}
            <img
                src={movie.imageUrl}
                className="card-img-top"
                alt={movie.title}
                style={{ objectFit: "cover", aspectRatio: "3 / 4" }}
            />

            <div className="card-body">
                <h5 className="card-title">
                    {movie.title}

                    {typeof movie.averageRating === "number" ? (
                        <span className="text-muted ms-2">
                            ({movie.averageRating.toFixed(1)} ⭐)
                        </span>
                    ) : (
                        <span className="text-muted ms-2">
                            (No ratings)
                        </span>
                    )}
                </h5>

                <p className="card-text">
                    {movie.synopsis?.substring(0, 100)}...
                </p>
            </div>

            <div className="card-footer bg-white border-0">
                <Link
                    to={`/movies/${movie.id}`}
                    className="btn btn-primary w-100"
                    style={{ backgroundColor: "red", borderColor: "red" }}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}