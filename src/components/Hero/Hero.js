import React from 'react';
import './Hero.scss'
import CTAButton from '../UI/CTAButton/CTAButton';
import HeroImage from '../../assests/images/HeroArt-Photoroom.png-Photoroom.png'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="hero-banner">
            <div className="hero-banner__content">
                <h2 className="hero-banner__slogan">
                    Learn through Conversation
                </h2>
                <p className="hero-banner__details">
                    In a conversation, ideas are exchanged, perspectives are shared, and questions are raised, fostering a deeper understanding of the topic at hand.
                </p>
                <Link to='/signup'><CTAButton className="button-add" text="Get Started" btnType="hero" /></Link>
            </div>
            <img className="hero-banner__image"src= {HeroImage} alt= "hero banner about discovering your mind" />

        </section>
    );
};

export default Hero;