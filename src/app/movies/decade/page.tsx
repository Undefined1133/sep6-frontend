"use client";
import React, { useEffect, useState } from "react";
import movieService from "@/services/movieService";
import Link from "next/link";
import './page.css';
import seriesService from "@/services/seriesService";

const RecommendationsPage = () => {
    const [firstDecade, setFirstDecade] = useState<IMovie[]>([]);
    const [secondDecade, setSecondDecade] = useState<IMovie[]>([]);
    const [thirdDecade, setThirdDecade] = useState<IMovie[]>([]);
    const [fourthDecade, setFourthDecade] = useState<IMovie[]>([]);
    const [fifthDecade, setFifthDecade] = useState<IMovie[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const firstDecadeMovies = await movieService.getMostPopularMoviesByDecade("1970-01-01", "1979-12-30");
            setFirstDecade(firstDecadeMovies);

            const secondDecadeMovies = await movieService.getMostPopularMoviesByDecade("1980-01-01", "1989-12-30");
            setSecondDecade(secondDecadeMovies);

            const thirdDecadeMovies = await movieService.getMostPopularMoviesByDecade("1990-01-01", "1999-12-30");
            setThirdDecade(thirdDecadeMovies);

            const fourthDecadeMovies = await movieService.getMostPopularMoviesByDecade("2000-01-01", "2009-12-30");
            setFourthDecade(fourthDecadeMovies);

            const fifthDecadeMovies = await movieService.getMostPopularMoviesByDecade("2010-01-01", "2019-12-30");
            setFifthDecade(fifthDecadeMovies);

        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="information-container">
            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">1970</h3>
                <div className="section-content">
                    {firstDecade.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="section-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} />
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                )}
                                <h3 className="section-item-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">1980</h3>
                <div className="section-content">
                    {secondDecade.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="section-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} />
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                )}
                                <h3 className="section-item-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">1990</h3>
                <div className="section-content">
                    {thirdDecade.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="section-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} />
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                )}
                                <h3 className="section-item-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">2000</h3>
                <div className="section-content">
                    {fourthDecade.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="section-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} />
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                )}
                                <h3 className="section-item-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">2010</h3>
                <div className="section-content">
                    {fifthDecade.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <div className="section-item">
                                {movie.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} />
                                ) : (
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                )}
                                <h3 className="section-item-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendationsPage;

