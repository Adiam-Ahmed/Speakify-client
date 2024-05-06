import React from 'react';
import SpeechToText from '../components/UI/SpeechToText';
import { Link } from 'react-router-dom'


const Speakify = () => {
    return (
        <div>
            <Link to='/profile'><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary btn-active">Back to DashBoard </button></Link>
            <SpeechToText />
        </div>
    );
};

export default Speakify;