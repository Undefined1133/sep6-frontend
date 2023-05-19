"use client";
import {FC, useEffect, useState} from "react";
import movieService from "@/services/movieService";
import './page.css';
import Link from "next/link";

const page: FC<PageProps> = ({params}) => {
    const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovie = await movieService.getMovieById(params.movieId);
            setSelectedMovie(fetchedMovie);
        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="container">
            <Link href="/" className="back-button">{"< Back"}</Link>
            {selectedMovie ? (
                <div className="movie-details-container">
                    <div className="movie-image">
                        <img
                            src={"https://image.tmdb.org/t/p/original/" + selectedMovie.poster_path}
                            alt={selectedMovie.title}
                        />
                    </div>
                    <div className="movie-info">
                        <h2>{selectedMovie.title}</h2>
                        <p>Average Rating: {selectedMovie.vote_average}</p>
                        <p>Average Votes: {selectedMovie.vote_count}</p>
                        <p>Original Language: {selectedMovie.original_language}</p>
                        <p>Popularity: {selectedMovie.popularity}</p>
                        <p>{selectedMovie.overview}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


export default page;