"use client";
import React, {ChangeEvent, useEffect, useState} from 'react';
import './page.css';
import movieService from "@/services/movieService";
import Link from "next/link";
import actorService from "@/services/actorService";

const MoviesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [top20Movies, setTop20Movies] = useState<IMovie[]>([]);
    const [persons, setPersons] = useState<IActor[]>([]);
    const [top20Persons, setTop20Persons] = useState<IActor[]>([]);
    const [searchType, setSearchType] = useState<'movies' | 'actors'>('movies');



    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovies = await movieService.getMostPopularMovies();
            setTop20Movies(fetchedMovies);
            setMovies(fetchedMovies);
            const fetchedMostPopularPersons = await actorService.getMostPopularPersons();
            setTop20Persons(fetchedMostPopularPersons);
            setPersons(fetchedMostPopularPersons);
        };

        fetchData().then(r => console.log(r));
    }, []);

    const onSearchPressed = () => {
        if (searchType === 'movies') {
            searchMovies();
        } else {
            searchActors();
        }
    };

    const searchMovies = async () => {
        if (searchTerm.length === 0) {
            setMovies(top20Movies);
        } else {
            const result = await movieService.getMoviesByName(searchTerm);
            setMovies(result);
        }
    };

    const searchActors = async () => {
        if (searchTerm.length === 0) {
            setPersons(top20Persons);
        } else {
            const result = await actorService.getActorsByName(searchTerm);
            setPersons(result);
        }
    };

    return (
        <div className="movies-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
                <select value={searchType} onChange={event => setSearchType(event.target.value as 'movies' | 'actors')}>
                    <option value="movies">Movies</option>
                    <option value="actors">Person</option>
                </select>
                <button className="submit-button" onClick={onSearchPressed}>
                    Search {searchType === 'movies' ? 'Movies' : 'Actors'}
                </button>
            </div>

            <div className="movies-grid">
                {searchType === 'movies' ? (
                    movies.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="movies-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title}/>
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title}/>
                                )}
                                <h3 className="movies-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    persons.map(person => (
                        <Link href={`/actors/[actorId]`} as={`/actors/${person.id}`} key={person.id}>
                            <li className="person-item" key={person.id}>
                                {person.profile_path ? (
                                    <>
                                        <img src={"https://image.tmdb.org/t/p/w500/" + person.profile_path} alt={person.name} />
                                        <span className="person-name">{person.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <img src={"/default_pfp.png"} alt={person.name} />
                                        <span className="person-name">{person.name}</span>
                                    </>
                                )}
                            </li>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default MoviesPage;