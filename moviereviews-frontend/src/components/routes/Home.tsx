import { useState, useEffect} from "react";
import type { Movie } from "../../types/Movie";
import MovieCard from "../MovieCard";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]); 

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch(import.meta.env.VITE_API_HOST + "api/movies");
            const movies = await res.json();
            setMovies(movies);
        };

        fetchMovies();
    }, []);
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Movie Reviews</h2>

            <div className="row">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} className="col-md-4 mb-4">
                            <MovieCard movie={movie} />
                        </div>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </div>
        </div>
    );
}