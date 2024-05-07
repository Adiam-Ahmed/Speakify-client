import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Drawer from '../UI/Drawer';
import MicIcon from '@mui/icons-material/Mic';

const URL_BASE = process.env.REACT_APP_SERVER_URL;

const Main = ({ userId }) => {

    console.log(userId)

    const [userInput, setUserInput] = useState('');
    const [botResponse, setBotResponse] = useState('');
    const [chatData, setChatData] = useState([]);
    const [booksListData, setBooksList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);


    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    useEffect(() => {
        const fetchBooksList = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`${URL_BASE}/profile/book/${userId}`);
                setBooksList(response.data);
            } catch (err) {
                console.log('Cannot get book data');
            }
            setIsFetching(false);
        }
        fetchBooksList();
    }, [botResponse])

    // if fetching data, display loading message
    if (isFetching) {
        return (
            <p>... Loading book data ...</p>
        )
    }


    const fetchBotResponse = async () => {
        try {
            const response = await axios.post(`${URL_BASE}/profile/learn`, {
                userInput: userInput.trim(),
                userId: userId
            });



            const responseData = response.data.botResponse
            console.log(responseData)
            setBotResponse(responseData);
            // Update user input immediately
            setChatData(prevChatData => [
                ...prevChatData,
                { id: generateUniqueId(), message: userInput, sender: "user" }
            ]);

            // Delay bot response for 3 seconds
            setTimeout(() => {
                setBotResponse(responseData);

                // Update chat data after bot response
                setChatData(prevChatData => [
                    ...prevChatData,
                    { id: generateUniqueId(), message: responseData, sender: "bot" }
                ]);
            }, 1000);
        } catch (error) {
            console.error('Error processing request:', error);
        }
    };



    const handleSubmit = async () => {
        fetchBotResponse();
        setUserInput("")
    };
    return (
        <div>
            <Drawer booklist={booksListData} />
            <div className="flex flex-col items-center justify-center w-full p-4">
                <h2 className="mb-4">What do you want to learn about today?</h2>
                <div className="flex items-center w-full max-w-2xl">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-primary input-lg w-full"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-2 flex items-center pr-3"
                            style={{ cursor: 'pointer' }}
                            onClick={handleSubmit}
                        >
                            <MicIcon style={{ pointerEvents: 'auto' }} />
                        </div>
                    </div>
                    <div
                        className="ml-2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleSubmit}

                    >
                        <ArrowForwardIosIcon />
                    </div>

                </div>

            </div>

            {/* Container for rendering chat data */}
            <div className="border border-gray-300 rounded-lg p-4 max-w-2xl mx-auto">
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

export default Main;