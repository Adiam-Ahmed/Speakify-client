import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlipCard.scss';
import placeholder from '../../assests/images/27002.jpg';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
const ACESS_KEY = process.env.REACT_APP_ACESS_KEY 

const FlipCard = ({ flashCard }) => {
    const [image , setImage] = useState()
    const [answerImage, setAnswerImage] = useState()

    useEffect(() => {

        const getImage = async () => {
            try {
                const getImageQuestionData = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(flashCard.question)}&client_id=${ACESS_KEY}&per_page=1$`);
                const getImageAnswerData = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(flashCard.answer)}&client_id=${ACESS_KEY}&per_page=1$`);
                
                const answerImage = getImageAnswerData.data.results[0].urls.small
                const image = getImageQuestionData.data.results[0].urls.small
                setImage(image)
                setAnswerImage(answerImage)


            } catch (err) {
                console.log('Cannot get image data');
            }
            
        }
        getImage()
    },[])

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
                            <img src={image} alt="placeholder" className="placeholder" />
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
                            <img src={answerImage} alt="placeholder" className="placeholder" />
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
