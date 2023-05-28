"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import userService from "@/services/userService";

const Header = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>();

    useEffect(() => {
        const fetchedUser = userService.getCurrentUser();
        console.log('Current User:', fetchedUser);
        setCurrentUser(fetchedUser)
    }, []);

    const handleLogout = () => {
        userService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div className="header bg-gray-500 fixed w-full top-0 left-0 flex items-center justify-between pl-6 pr-6">
            <Link href="/movies" className="home-button">
                <img src="/next.svg" alt="Tesla" className="w-20 h-20" />
            </Link>
            <div>
                {currentUser ? (
                    <>
                        <Link href="/movies/favorites" className="text-white font-bold mr-4">
                            Favorites
                        </Link>
                        <Link href="/actors" className="text-white font-bold mr-4">
                            Top 20 Persons
                        </Link>
                        <Link href="/users" className="text-white font-bold mr-4">
                            Profile
                        </Link>
                        <button className="text-white font-bold mr-4" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/actors" className="text-white font-bold mr-4">
                            Top 20 Persons
                        </Link>
                        <Link href="/login" className="text-white font-bold mr-4">
                            Log in
                        </Link>
                        <Link href="/register" className="text-white font-bold">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
