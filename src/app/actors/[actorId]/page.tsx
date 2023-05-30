"use client";
import React, {FC, useEffect, useState} from "react";
import Link from "next/link";
import actorService from "@/services/actorService";
import './page.css';
import statisticService from "@/services/statisticService";


const page: FC<ActorPageProps> = ({params}) => {
    const [selectedActor, setSelectedActor] = useState<IActor | undefined>();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [popularity, setPopularity] = useState<number>(0);



    useEffect(() => {
        const fetchData = async () => {
            const fetchedActor = await actorService.getActorById(params.actorId);
            setSelectedActor(fetchedActor);
            const fetchedMovies = await actorService.getMoviesByActorId(params.actorId);
            setMovies(fetchedMovies);
            const actorsPopularity = await statisticService.getAverageRatingForActorsMovie(params.actorId);
            setPopularity(actorsPopularity)
        };

        fetchData().then(r => console.log(r));
    }, []);

    return <div className="selected-actor-container">
        <Link href="/" className="back-button">{"< Back"}</Link>
        <div className="actor-details-container">
            {selectedActor ? (
                <>
                    <div className="actor-image">
                        {selectedActor.profile_path ? (
                            <>
                                <img src={"https://image.tmdb.org/t/p/w500/" + selectedActor.profile_path}
                                     alt={selectedActor.name}/>
                            </>
                        ) : (
                            <>
                                <img src={"/default_pfp.png"} alt={selectedActor.name}/>
                                <span className="star-name">{selectedActor.name}</span>
                            </>
                        )}
                    </div>
                    <div className="actor-info">
                        <h2>{selectedActor.name || 'N/A'}</h2>
                        <p>Average rating for movies: {popularity.toFixed(2) + "/10" || 'N/A'}</p>
                        <p>Known for department: {selectedActor.known_for_department || 'N/A'}</p>
                        <p>Biography: {selectedActor.biography || 'N/A'}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        <div className="starred-movies-container">
            <h3>Starring Movies:</h3>
            {movies ? (
                <ul className="starred-movies-list">
                    {movies.map(movie => (
                        <Link href={`/movies/[movieId]`} as={`/movies/${movie.id}`} key={movie.id}>
                            <li className="starred-movie-item" key={movie.id}>
                                {movie.poster_path ? (
                                    <>
                                        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                                             alt={movie.title}/>
                                        <h3 className="starred-movie-title">{movie.title}</h3>
                                    </>
                                ) : (
                                    <>
                                        <img src={"/default-movie-poster.png"} alt={movie.title}/>
                                        <h3 className="starred-movie-title">{movie.title}</h3>
                                    </>
                                )}
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>Loading movies...</p>
            )}
        </div>
    </div>
};

export default page;