import React, { useState, useEffect } from 'react';
import SpeechToText from '../components/UI/SpeechToText';
import { Link } from 'react-router-dom'
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SpeakifyPage = () => {

    const [transcript, setTranscript] = useState('');
    const [botResponse, setBotResponse] = useState('');
    const [chatData, setChatData] = useState([]);

    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
    const handleTranscriptUpdate = (newTranscript) => {
        setTranscript(newTranscript);
    };
    console.log(transcript)


    useEffect(() => {
        const fetchBotResponse = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/check/user/understanding`, {
                    transcript: transcript,

                });
                console.log(response)
                const responseData = response.data.feedback
                setBotResponse(responseData);
                // Update user input immediately
                setChatData(prevChatData => [
                    ...prevChatData,
                    { id: generateUniqueId(), message: transcript, sender: "user" }
                ]);

                setTimeout(() => {
                    setBotResponse(responseData);

                    setChatData(prevChatData => [
                        ...prevChatData,
                        { id: generateUniqueId(), message: responseData, sender: "bot" }
                    ]);
                }, 300);
            } catch (error) {
                console.error('Error processing request:', error);
            }

        }
        fetchBotResponse()
    }, [transcript])

    console.log(botResponse)


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