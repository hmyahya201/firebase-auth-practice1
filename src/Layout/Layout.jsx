/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;