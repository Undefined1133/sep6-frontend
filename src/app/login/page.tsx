"use client";
import { ChangeEvent, FormEvent, useState } from 'react';
import './page.css';
import userService from "@/services/userService";
import Link from "next/link";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await userService.login(username, password);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <Link href="/" className="back-button">{"< Back"}</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="username">Username:</label>
                    <input type="username" id="username" value={username} onChange={handleEmailChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button className="login-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;
