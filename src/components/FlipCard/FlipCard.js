import React, { useState } from 'react';
import './FlipCard.scss';
import placeholder from '../../assests/images/27002.jpg';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

const FlipCard = ({ flashCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleToggle = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flip-card-wrapper ${isFlipped ? 'active' : ''}`}>
            <div className="flip-card">
                <div className="flip-card__front-side">
                    <div className="col-2">
                        <h1 className="header">Question</h1>
                        <div className="col-3">
                            <img src={placeholder} alt="placeholder" className="placeholder" />
                            <p>{flashCard.question}</p>
                        </div>
                        <div className="toggle-btn">
                            <ToggleButton
                                value="check"
                                selected={isFlipped}
                                onClick={handleToggle}
                            >
                                <CheckIcon />
                            </ToggleButton>
                        </div>
                    </div>
                </div>
                <div className="flip-card__back-side">
                    <div className="col-2">
                        <h1 className="header">Answer</h1>
                        <div className="col-3">
                            <img src={placeholder} alt="placeholder" className="placeholder" />
                            <div>
                                <h3>{flashCard.answer}</h3>
                            </div>
                        </div>
                        <div className="toggle-btn">
                            <ToggleButton
                                value="check"
                                selected={isFlipped}
                                onClick={handleToggle}
                            >
                                <CheckIcon />
                            </ToggleButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
