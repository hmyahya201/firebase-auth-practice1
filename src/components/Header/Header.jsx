/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav>
            <Link className='m-link' to = "/">Home</Link>
            <Link className='m-link' to = "/login">Login</Link>
            <Link className='m-link' to = "/register">Register</Link>
        </nav>
    );
};

export default Header;