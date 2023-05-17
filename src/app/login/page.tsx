"use client";
import { ChangeEvent, FormEvent, useState } from 'react';
import './page.css';
import authService from "@/services/authService";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
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
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
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
