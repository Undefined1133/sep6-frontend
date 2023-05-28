"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import './page.css';
import userService from "@/services/userService";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavoritesPage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if(userService.getCurrentUser() != null && userService.getCurrentUser().userId != 0){
                const fetchedMovies = await userService.getFavoriteMovies(userService.getCurrentUser().userId);
                const updatedMovies = fetchedMovies.map((movie : IMovie) => ({
                    ...movie,
                    isFavorite: true,
                }));
                setFavoriteMovies(updatedMovies);
            }
        };

        fetchData().then((r) => console.log(r));
    }, []);

    const handleFavoriteClick = async (movie: IMovie) => {
        const favoriteMovie: IFavoriteMovie = {
            userId: userService.getCurrentUser().userId,
            movieId: movie?.id,
            favorite: movie.isFavorite ? 0 : 1,
        };

        var response =  await userService.setFavoriteMovie(favoriteMovie);

        const updatedMovies = favoriteMovies.filter((m) => m.id !== movie.id);
        setFavoriteMovies(updatedMovies);
    };

    return (
        <div className="favorites-movies-container">
            <h3 className="text-black font-bold mr-4">Favorite Movies:</h3>
            <div className="favorites-movie-list">
                {favoriteMovies.map((movie) => (
                    <div key={movie.id} className="favorites-movie-item">
                        <div className="favorites-movie-content">
                            {movie.poster_path ? (
                                <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                                    <img src={"https://image.tmdb.org/t/p/w500//" + movie.poster_path} alt={movie.title} />
                                </Link>
                            ) : (
                                <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} passHref>
                                    <img src={"/default-movie-poster.png"} alt={movie.title} />
                                </Link>
                            )}
                            <h3 className="favorites-movie-title">{movie.title}</h3>
                        </div>
                        <div className="favorites-button-container">
                            <Button
                                className="add-to-favorites-button"
                                variant={movie.isFavorite ? "contained" : "outlined"}
                                color="error"
                                onClick={() => handleFavoriteClick(movie)}
                                startIcon={<FavoriteIcon />}
                            >
                                {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
