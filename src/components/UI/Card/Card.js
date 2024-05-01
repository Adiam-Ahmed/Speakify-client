import React from 'react';
import './Card.scss';

const Card = () => {
    return (
        <div className='feature-card-container'>
            <div className='feature-card'>
                <h2 className='feature-card__header'>CONVERSATION BASED LEARNING </h2>
                <p className='feature-card__detail'>Unique approach to learning through engaging conversations. By fostering dialogue and interaction, users not only absorb information but also actively participate in the learning process.</p>
            </div>
            <div className='feature-card'>
                <h2 className='feature-card__header'>PROGRESS TRACKING AND ACHIEVEMENT</h2>
                <p className='feature-card__detail'>With our comprehensive progress tracking system, monitoring your journey towards success has never been easier. Keep tabs on your accomplishments, track your milestones, and celebrate your achievements every step of the way.</p>
            </div>
            <div className='feature-card'>
                <h2 className='feature-card__header'>PERSONALIZED LEARNING EXPERIENCES</h2>
                <p className='feature-card__detail'>Whether you're a visual learner, an auditory learner, or a kinesthetic learner, our adaptive technology ensures that your learning experience is both effective and enjoyable.</p>
            </div>
        </div>
    );
};

export default Card;
