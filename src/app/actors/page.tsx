"use client";
import React, { useEffect, useState } from "react";
import actorService from "@/services/actorService";
import Link from "next/link";
import './page.css';


const PersonsPage = () => {
    const [top20Persons, setTop20Persons] = useState<IActor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMostPopularPersons = await actorService.getMostPopularPersons();
            setTop20Persons(fetchedMostPopularPersons);
        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="persons-container">
            {top20Persons.map(person => (
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
            ))}
        </div>
    );
};

export default PersonsPage;
