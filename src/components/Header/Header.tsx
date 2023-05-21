import React from 'react';
import './Header.css';
import Link from "next/link";

const Header = () => (
    <div className="header">
        <Link href="/" className="home-button">
        <img src={"/next.svg"} alt="Tesla" />
        </Link>
    </div>
)
export default Header;