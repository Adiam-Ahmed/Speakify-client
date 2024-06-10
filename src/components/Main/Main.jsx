import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Drawer from '../UI/Drawer';

const URL_BASE = process.env.REACT_APP_SERVER_URL;

const Main = ({ userId }) => {
    const [userInput, setUserInput] = useState('');
    const [botResponse, setBotResponse] = useState('');
    const [chatData, setChatData] = useState([]);
    const [booksListData, setBooksList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


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
    }, [userId, botResponse])

    // if fetching data, display loading message
    if (isFetching) {
        return (
            <p>... Loading book data ...</p>
        )
    }

    const fetchBotResponse = async (userInput) => {
        let loadInterval;

        // Add loading indicator to chat data
        setChatData(prevChatData => [
            ...prevChatData,
            { id: generateUniqueId(), message: '...', sender: 'bot' }
        ]);

        try {
            // Show loader
            setIsLoading(true);

            loadInterval = setInterval(() => {
                setChatData(prevChatData => {
                    const lastMessage = prevChatData[prevChatData.length - 1];
                    if (lastMessage.sender === 'bot' && lastMessage.message === '...') {
                        lastMessage.message = lastMessage.message.length < 3 ? lastMessage.message + '.' : '.';
                        return [...prevChatData];
                    }
                    return prevChatData;
                });
            }, 400);


            const response = await axios.post(`${URL_BASE}/profile/learn`, {
                userInput: userInput.trim(),
                userId: userId
            });
            const responseData = response.data.botResponse;

            // Clear loader
            clearInterval(loadInterval);
            setIsLoading(false);

            // Replace loading indicator with actual response
            setChatData(prevChatData => [
                ...prevChatData.slice(0, -1), // Remove the last loading indicator

                { id: generateUniqueId(), message: responseData, sender: 'bot' }
            ]);
        } catch (error) {
            console.error('Error processing request:', error);
            clearInterval(loadInterval);
            setIsLoading(false);
        }
    };


    const handleSubmit = async () => {
        if (userInput.trim()) {
            const newUserMessage = { id: generateUniqueId(), message: userInput, sender: "user" };

            // Update chat data with user input immediately
            setChatData(prevChatData => [
                ...prevChatData,
                newUserMessage
            ]);

            // Clear user input
            setUserInput("");

            // Fetch bot response
            fetchBotResponse(userInput);
        }
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        />
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