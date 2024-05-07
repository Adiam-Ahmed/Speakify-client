import React from 'react';
import Hero from '../../components/Hero/Hero'
import { Outlet } from "react-router-dom"

const LandingPage = () => {


    return (
        <div>
            <Outlet />
            <Hero />
        </div>
    );
};

export default LandingPage;