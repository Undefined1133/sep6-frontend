"use client";
import React, { FC, useEffect, useState } from "react";
import movieService from "@/services/movieService";
import './page.css';
import Link from "next/link";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import userService from "@/services/userService";
import statisticService from "@/services/statisticService";

const Page: FC<MoviePageProps> = ({ params }) => {
    const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>();
    const [actors, setActors] = useState<IActor[] | undefined>([]);
    const [ratingValue, setRatingValue] = useState<number>(0);
    const [totalRatingValue, setTotalRatingValue] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovie = await movieService.getMovieById(params.movieId);
            setSelectedMovie(fetchedMovie);
            const fetchedActors = await movieService.getActorsByMovieId(params.movieId);
            setActors(fetchedActors);
            if(userService.getCurrentUser() != null && userService.getCurrentUser().userId != 0) {
                const fetchedIsFavorite = await userService.isFavoriteMovie(userService.getCurrentUser().userId, fetchedMovie?.id);
                setIsFavorite(fetchedIsFavorite)
                const fetchedRating = await userService.getMovieRating(userService.getCurrentUser().userId, fetchedMovie?.id);
                setRatingValue(fetchedRating);
                const fetchedTotalRating = await statisticService.getMovieTotalRatingById(fetchedMovie?.id);
                setTotalRatingValue(fetchedTotalRating);
            }
        };
        fetchData().then(r => console.log(r));
    }, []);


    const handleFavoriteClick = async () => {
        if (userService.getCurrentUser() == null || userService.getCurrentUser().userId == 0) {
            throw new Error("You need to log in to add a movie to your list of favorites")
        }
        setIsFavorite(prevIsFavorite => !prevIsFavorite);

        if (isFavorite) {
            const favoriteMovie: IFavoriteMovie = {
                userId: userService.getCurrentUser().userId,
                movieId: selectedMovie?.id,
                favorite: 0,
            };
            var response = await userService.setFavoriteMovie(favoriteMovie)
        } else {
            const favoriteMovie: IFavoriteMovie = {
                userId: userService.getCurrentUser().userId,
                movieId: selectedMovie?.id,
                favorite: 1,
            };
            var response = await userService.setFavoriteMovie(favoriteMovie)
        }
    };

    const handleSetRating = async (rating: number) => {
        if (userService.getCurrentUser() == null || userService.getCurrentUser().userId == 0) {
            throw new Error("You need to log in to add a rating to the movie")
        }
        setRatingValue(rating);

            const movieRating: IMovieRating = {
                userId: userService.getCurrentUser().userId,
                movieId: selectedMovie?.id,
                rating: rating,
            };

            var response = await userService.setMovieRating(movieRating)
        const fetchedTotalRating = await statisticService.getMovieTotalRatingById(selectedMovie?.id);
        setTotalRatingValue(fetchedTotalRating);
        }



    return (
        <div className="container">
            <Link href="/" className="back-button">{"< Back"}</Link>
            <div className="movie-details-container">
                {selectedMovie ? (
                    <>
                        <div className="movie-image">
                            {selectedMovie.poster_path ? (
                                <img
                                    src={"https://image.tmdb.org/t/p/w500/" + selectedMovie.poster_path}
                                    alt={selectedMovie.title}
                                />
                            ) : (
                                <img
                                    src={"/default-movie-poster.png"}
                                    alt={selectedMovie.title}
                                />
                            )}
                            <div className="favorite-button-container">
                                <Button
                                    className="add-to-favorites-button"
                                    variant={isFavorite ? "contained" : "outlined"}
                                    color={"error"}
                                    onClick={handleFavoriteClick}
                                    startIcon={<FavoriteIcon />}
                                >
                                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                </Button>
                            </div>
                        </div>
                        <div className="movie-info">
                            <h2>{selectedMovie.title}</h2>
                            <Rating
                                name="simple-controlled"
                                value={ratingValue ?? 0}
                                max={10}
                                onChange={(event, newValue) => {
                                    handleSetRating(newValue ?? 0);
                                }}
                            />
                            <p>Average Rating: {totalRatingValue.toFixed(3)}</p>
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
                            <Link href={`/actors/[actorId]`} as={`/actors/${actor.id}`} key={actor.id}>
                                <li className="star-item" key={actor.id}>
                                    {actor.profile_path ? (
                                        <>
                                            <img src={"https://image.tmdb.org/t/p/w500/" + actor.profile_path} alt={actor.name} />
                                            <span className="star-name">{actor.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <img src={"/default_pfp.png"} alt={actor.name}  />
                                            <span className="star-name">{actor.name}</span>
                                        </>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>Loading actors...</p>
                )}
            </div>
        </div>
    );
};

export default Page;
