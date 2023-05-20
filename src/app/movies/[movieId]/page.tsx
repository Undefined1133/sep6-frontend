"use client";
import {FC, useEffect, useState} from "react";
import movieService from "@/services/movieService";
import './page.css';
import Link from "next/link";

const page: FC<PageProps> = ({params}) => {
    const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>();
    const [actors, setActors] = useState<IActor[] | undefined>([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovie = await movieService.getMovieById(params.movieId);
            setSelectedMovie(fetchedMovie);
            const fetchedActors = await movieService.getActorsByMovieId(params.movieId);
            setActors(fetchedActors);
        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="container">
            <Link href="/" className="back-button">{"< Back"}</Link>
            <div className="movie-details-container">
                {selectedMovie ? (
                    <>
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
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="stars-container">
                <h3>Starring Actors:</h3>
                {actors ? (
                    <ul className="stars-list">
                        {actors.map((actor) => (
                                <li className="star-item" key={actor.id}>
                                    {actor.profile_path ? (
                                        <>
                                            <img src={"https://image.tmdb.org/t/p/original/" + actor.profile_path} alt={actor.name} />
                                            <span className="star-name">{actor.name}</span>
                                        </>
                                    ) : (
                                        <>
                                             <img src={"/default_pfp.png"} alt={actor.name}/>
                                            <span className="star-name">{actor.name}</span>
                                        </>
                                    )}
                                </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading actors...</p>
                )}
            </div>
        </div>
    );
};

export default page;