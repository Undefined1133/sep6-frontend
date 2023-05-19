"use client";
import React, {ChangeEvent, useEffect, useState} from 'react';
import './page.css';
import movieService from "@/services/movieService";
import Link from "next/link";

const MoviesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [top20Movies, setTop20Movies] = useState<IMovie[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovies = await movieService.getMostPopularMovies();
            setTop20Movies(fetchedMovies);
            setMovies(fetchedMovies);
        };

        fetchData().then(r => console.log(r));
    }, []);

    const onSearchPressed = () => {
        if(searchTerm.length == 0){
            setMovies(top20Movies);
        }else {
            movieService.getMoviesByName(searchTerm).then(result => {
                console.log(result);
                setMovies(result);
            })
        }

    }


    return (
        <div className="movies-container">
            <h1>Movies</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
                <button className="submit-button" onClick={onSearchPressed}>Search</button>
            </div>
            <div className="movies-grid">
                {movies.map(movie => (
                    <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                        {/* Replace the <a> tag with a <div> or another suitable element */}
                        <div className="movie-item">
                            <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} alt={movie.title} />
                            <h3 className="movie-title">{movie.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;