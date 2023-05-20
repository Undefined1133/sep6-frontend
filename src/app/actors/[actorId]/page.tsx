"use client";
import {FC, useEffect, useState} from "react";
import movieService from "@/services/movieService";
import Link from "next/link";
import actorService from "@/services/actorService";

const page: FC<PageProps> = ({params}) => {
    const [selectedActor, setSelectedActor] = useState<IActor | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedActors = await actorService.getActorById(33);
            setSelectedActor(fetchedActors);
        };

        fetchData().then(r => console.log(r));
    }, []);

    return <div className="container">
            <Link href="/" className="back-button">{"< Back"}</Link>
            <div className="actor-details-container">
                {selectedActor ? (
                    <>
                        <div className="actor-image">
                            {selectedActor.profile_path ? (
                                <>
                                    <img src={"https://image.tmdb.org/t/p/original/" + selectedActor.profile_path} alt={selectedActor.name} />
                                    <span className="star-name">{selectedActor.name}</span>
                                </>
                            ) : (
                                <>
                                    <img src={"/default_pfp.png"} alt={selectedActor.name}/>
                                    <span className="star-name">{selectedActor.name}</span>
                                </>
                            )}
                        </div>
                        <div className="actor-info">
                            <h2>{selectedActor.name}</h2>
                            <p>Popularity: {selectedActor.popularity}</p>
                            <p>Gender: {selectedActor.gender}</p>
                            <p>Original Name: {selectedActor.original_name}</p>
                            <p>Known for department: {selectedActor.known_for_department}</p>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
};

export default page;