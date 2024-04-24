import React from 'react';
import './Card.scss';

const Card = ({ header, detail }) => {
    return (
        <div className='card'>
            <h2 className='card__header'>{header}</h2>
            <p className='card__detail'>{detail}</p>
        </div>
    );
};

export default Card;
