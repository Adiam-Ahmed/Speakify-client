import React, { useState, useEffect } from 'react';
import SpeechToText from '../components/UI/SpeechToText';
import { Link } from 'react-router-dom'
import axios from 'axios';
import SelectSaveNote from '../components/SelectSaveNote';
import Drawer from '../components/UI/Drawer';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const SpeakifyPage = () => {
    const [userId, setUserId] = useState('');
    const [transcript, setTranscript] = useState('');
    const [botResponse, setBotResponse] = useState('');
    const [chatData, setChatData] = useState([]);
    const [booksList, setBooksList] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');


    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
    const handleTranscriptUpdate = (newTranscript) => {
        setTranscript(newTranscript);
    };

    const handleSelectedBook = (selectedBook) => {
        setSelectedBook(selectedBook);
    };


    const bookId = booksList.find(book => book.title === selectedBook)?.id;

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        const fetchBotResponse = async () => {
            try {

                const Bookresponse = await axios.get(`${SERVER_URL}/profile/book/title/${userId}`);
                setBooksList(Bookresponse.data)

                const response = await axios.post(`${SERVER_URL}/profile/check/user/understanding`, {
                    transcript: transcript,
                    book_id: bookId,

                });
                const responseData = response.data.feedback
                setBotResponse(responseData);
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
                }, 50);
            } catch (error) {
                console.error('Error processing request:', error);
            }

        }


        fetchBotResponse()
    }, [transcript])



    return (

        <div className="min-h-[79vh]">
            <div className="flex flex-row justify-between items-center" >
                {/* <Link to='/profile'><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary btn-active">Back to DashBoard </button></Link> */}
                <Drawer booklist={booksList} />
                {/* <SelectSaveNote booksList={booksList} onSelectBook={handleSelectedBook} /> */}
            </div>
            <div className="flex flex-col items-center justify-center w-full p-4">
                <h2 className="mb-4">Feeling Confident, Talk to me about what you just learned?</h2>
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
            <div className="border border-gray-300 rounded-lg p-4 mb-4 max-w-2xl mx-auto">
                {chatData.map(item => (
                    <div key={generateUniqueId()}>
                        <div className={`chat-bubble mt-3 mb-3 ${item.sender === 'bot' ? 'bot' : 'user'}`}>
                            {item.sender}: {item.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>



    );
};

export default SpeakifyPage;