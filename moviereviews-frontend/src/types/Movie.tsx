export interface Movie {
    id: number;
    title: string;
    synopsis: string;
    imageUrl: string;
    runtime: number;
    releaseDate: string;
    genreId: number;
    ratingId: number;
    averageRating?: number | null; 
}
