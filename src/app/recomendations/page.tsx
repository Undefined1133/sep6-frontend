"use client";
import React, { useEffect, useState } from "react";
import movieService from "@/services/movieService";
import Link from "next/link";
import './page.css';
import seriesService from "@/services/seriesService";

const RecommendationsPage = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<IMovie[]>([]);
    const [mostPopularMovies, setMostPopularMovies] = useState<IMovie[]>([]);
    const [weeklyTrendingMovies, setWeeklyTrendingMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const topRatedMovies = await movieService.getTopRatedMovies();
            setTopRatedMovies(topRatedMovies);

            const upcomingMovies = await movieService.getUpcomingMovies();
            setUpcomingMovies(upcomingMovies);

            const trendingMovies = await movieService.getWeeklyTrendingMovies();
            setWeeklyTrendingMovies(trendingMovies);

            const mostPopularMovies = await movieService.getMostPopularMovies();
            setMostPopularMovies(mostPopularMovies);
        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="information-container">
            <div className="section-container">
                <h3 className="section-title text-center font-bold text-xl">Top Rated Movies:</h3>
                <div className="section-content">
                    {topRatedMovies.map(movie => (
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
                <h3 className="section-title text-center font-bold text-xl">Upcoming Movies:</h3>
                <div className="section-content">
                    {upcomingMovies.map(movie => (
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
                <h3 className="section-title text-center font-bold text-xl">Weekly Trending Movies:</h3>
                <div className="section-content">
                    {weeklyTrendingMovies.map(movie => (
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
                <h3 className="section-title text-center font-bold text-xl">Most Popular Movies:</h3>
                <div className="section-content">
                    {mostPopularMovies.map(movie => (
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

