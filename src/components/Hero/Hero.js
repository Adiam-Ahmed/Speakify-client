import React from 'react';
import './Hero.scss'
import CTAButton from '../UI/CTAButton/CTAButton';

const Hero = () => {
    return (
        <section class="hero-banner">
            <div class="hero-banner__content">
                <h2 class="hero-banner__slogan">
                    Learn through Conversation
                </h2>
                <p class="hero-banner__details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur adipiscing elit onsectetur adipiscing elit.
                </p>
                <CTAButton className="button-add" text="Get Started" type="hero" />
            </div>
            <div className="hero-banner__layer layer2"></div>
        </section>
    );
};

export default Hero;