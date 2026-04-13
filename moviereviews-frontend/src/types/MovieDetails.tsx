export interface MovieDetails {
    id: number;
    title: string;
    synopsis: string;
    imageUrl: string;
    runtime: number;
    releaseDate: string;

    genre: string;
    ageRating: string;

    averageRating: number | null;
}