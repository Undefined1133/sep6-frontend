"use client";
import React, {FC, useEffect, useState} from "react";
import Link from "next/link";
import userService from "@/services/userService";
import './page.css';
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";


const page: FC<ActorPageProps> = ({params}) => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const handleFavoriteClick = async (movie: IMovie) => {
        if (!currentUser) {
            throw new Error(
                "You need to log in to add a movie to your list of favorites"
            );
        }

        const favoriteMovie: IFavoriteMovie = {
            userId: userService.getCurrentUser().userId,
            movieId: movie?.id,
            favorite: movie.isFavorite ? 0 : 1,
        };

       var response =  await userService.setFavoriteMovie(favoriteMovie);

        const updatedMovies = movies.filter((m) => m.id !== movie.id);
        setMovies(updatedMovies);
    };

    useEffect(() => {
        const randomUser: IUser = {
            userId: 2,
            username: "JohnDoe",
            email: "johndoe@example.com",
            password: "password123",
        };
        setCurrentUser(randomUser)

        const fetchData = async () => {
            const fetchedMovies = await userService.getFavoriteMovies(userService.getCurrentUser().userId);
            const updatedMovies = fetchedMovies.map((movie : IMovie) => ({
                ...movie,
                isFavorite: true,
            }));
            setMovies(updatedMovies);
        };

        fetchData().then((r) => console.log(r));
    }, []);

    return <div className="current-user-container">
        <div className="current-user-details-container">
            {currentUser ? (
                <>
                    <div className="profile-image">
                        <img src={"/default_pfp.png"} alt="profilePicture"/>
                    </div>
                    <div className="profile-info">
                        <p>Username: {userService.getCurrentUser().username}</p>
                        <p>Email: {userService.getCurrentUser().email}</p>
                    </div>
                </>
            ) : (
                <p>Loading movies...</p>
            )}
        </div>
        <div className="favorite-movies-container">
            <h3>Favorite Movies:</h3>
            {movies ? (
                <ul className="favorite-movie-list">
                    {movies.map((movie) => (
                        <li key={movie.id} className="favorite-movie-item">
                            <div className="movie-content">
                                {movie.poster_path ? (
                                    <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                                        <img src={"https://image.tmdb.org/t/p/w500//" + movie.poster_path} alt={movie.title} />
                                    </Link>
                                ) : (
                                    <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} passHref>
                                        <img src={"/default-movie-poster.png"} alt={movie.title} />
                                    </Link>
                                )}
                                <h3 className="favorite-movie-title">{movie.title}</h3>
                            </div>
                            <div className="button-container">
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading movies...</p>
            )}
        </div>
    </div>
};

export default page;