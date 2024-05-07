import React, { useState } from 'react';
import SpeechToText from '../components/UI/SpeechToText';
import { Link } from 'react-router-dom'


const SpeakifyPage = () => {

    const [transcript, setTranscript] = useState('');

    const handleTranscriptUpdate = (newTranscript) => {
        setTranscript(newTranscript);
    };

    console.log(transcript)


    return (
        <div>
            <Link to='/profile'><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary btn-active">Back to DashBoard </button></Link>
            <div className="flex flex-col items-center justify-center w-full p-4">
                <h2 className="mb-4">Feeling Confident, Talk to me about what you just learnt?</h2>
                <h3>The Stage is all yours</h3>
            </div>
            <SpeechToText onTranscriptUpdate={handleTranscriptUpdate} />
            <div className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex items-center w-full max-w-2xl">
                    <div className="relative w-full">
                        <div className="border border-primary rounded-lg p-4 max-w-2xl mx-auto m-4">
                            {transcript}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakifyPage;