import React from 'react';
import './Hero.scss'
import CTAButton from '../UI/CTAButton/CTAButton';

const Hero = () => {
    return (
        <section className="hero-banner">
            <div className="hero-banner__content">
                <h2 className="hero-banner__slogan">
                    Learn through Conversation
                </h2>
                <p className="hero-banner__details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur adipiscing elit onsectetur adipiscing elit.
                </p>
                <CTAButton className="button-add" text="Get Started" btnType="hero" />
            </div>
            <div className="hero-banner__layer layer2"></div>
        </section>
    );
};

export default Hero;