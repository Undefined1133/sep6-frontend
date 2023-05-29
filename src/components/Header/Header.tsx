"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import userService from '@/services/userService';
import './page.css';

const Header = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>();

    useEffect(() => {
        const fetchedUser = userService.getCurrentUser();
        console.log('Current User:', fetchedUser);
        setCurrentUser(fetchedUser);
    }, []);

    const handleLogout = () => {
        userService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div className="header bg-black fixed w-full top-0 left-0 flex items-center justify-between pl-0 pr-0">
            <div className="flex items-center">
                <Link href="/movies" className="home-button">
                    <img src="/best_movies_logo.jpg" alt="logo" className="logo" />
                </Link>
                {currentUser ? (
                    <>
                        <Link href="/recomendations" className="text-white font-bold ml-4">
                            Recommendations
                        </Link>
                        <Link href="/movies/favorites" className="text-white font-bold ml-4">
                            Favorites
                        </Link>
                        <Link href="/actors" className="text-white font-bold ml-4">
                            Top 20 Persons
                        </Link>
                        <Link href="/movies/decade" className="text-white font-bold ml-4">
                            Top Movies By Decade
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/recomendations" className="text-white font-bold ml-4">
                            Recommendations
                        </Link>
                        <Link href="/actors" className="text-white font-bold ml-4">
                            Top 20 Persons
                        </Link>
                        <Link href="/movies/decade" className="text-white font-bold ml-4">
                            Top Movies By Decade
                        </Link>
                    </>
                )}
            </div>
            <div className="flex items-center">
                {currentUser ? (
                    <button className="text-white font-bold ml-6 mr-4" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link href="/login" className="text-white font-bold ml-6 mr-4">
                            Log in
                        </Link>
                        <Link href="/register" className="text-white font-bold ml-6 mr-4">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;

