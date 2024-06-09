import React, { useState } from 'react';
import FlipCard from '../FlipCard/FlipCard';

const Carousel = ({ flashCardDetail, bookTitle }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handlePrev = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? flashCardDetail.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex === flashCardDetail.length - 1 ? 0 : prevIndex + 1));
    };

    // Check if flashCardDetail is undefined or empty
    if (!flashCardDetail || flashCardDetail.length === 0) {
        return <p>No flash card data available</p>;
    }

    return (
        <div className="carousel">
            <div className="carousel-item relative w-full flex justify-center">
                <div className="w-full flex justify-center">
                    <FlipCard bookTitle={bookTitle} flashCard={flashCardDetail[currentCardIndex]} />
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button onClick={handlePrev} className="btn btn-circle">❮</button>
                    <button onClick={handleNext} className="btn btn-circle">❯</button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;



