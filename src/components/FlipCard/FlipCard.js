import React, { useState } from 'react';
import './FlipCard.scss';
import placeholder from '../../assests/images/27002.jpg';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

const FlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleToggle = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`cards-wrapper ${isFlipped ? 'active' : ''}`}>
            <div className="card">
                <div className="card__front-side">
                    <div className="col-2">
                        <h1 className="header">Question</h1>
                        <div className="col-3">
                            <img src={placeholder} alt="placeholder" className="placeholder" />
                            <p>What is the answer of 2+2</p>
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
                <div className="card__back-side">
                    <div className="col-2">
                        <h1 className="header">Answer</h1>
                        <div className="col-3">
                            <img src={placeholder} alt="placeholder" className="placeholder" />
                            <div>
                                <h3>The answer of 2+2 =4</h3>
                            </div>
                        </div>
                        <div>
                            <p>Description:Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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