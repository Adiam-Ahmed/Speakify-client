import React from 'react';
import Hero from '../../components/Hero/Hero'
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { useEffect } from "react"
import { useNavigate, useLocation, Outlet } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

      useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      navigate('/login')
    } else {
      navigate('/profile')
    }
  }, [location.pathname])
    return (
        <div>
            <Outlet />
            <Hero />
            <FeatureCard />
        </div>
    );
};

export default LandingPage;