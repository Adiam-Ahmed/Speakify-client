import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../components/UI/Carousel';
const URL_BASE = process.env.REACT_APP_SERVER_URL;


const BookPage = () => {

    const { bookId } = useParams()
    const [isFetching, setIsFetching] = useState(true);
    const [bookDetail, setBookDetail] = useState();
    const [flashCardDetail, setFlashCardDetail] = useState([]);

    useEffect(() => {
        const fetchBookDetail = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`${URL_BASE}/profile/book/${bookId}`);
                console.log(response.data)
                setBookDetail(response.data);
            } catch (err) {
                console.log('Cannot get book data');
            }
            setIsFetching(false);
        }
        const fetchFlashCardDetail = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`${URL_BASE}/profile/flashCard/${bookId}`);
                console.log(response.data)
                setFlashCardDetail(response.data);
            } catch (err) {
                console.log('Cannot get flashCard data');
            }
            setIsFetching(false);
        }
        fetchBookDetail();
        fetchFlashCardDetail();
    }, [bookId])

    // if fetching data, display loading message
    if (isFetching) {
        return (
            <p>... Loading book data ...</p>
        )
    }
    


    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl capitalize py-4">{bookDetail.title}</h2>
            </div>
            <div className="divider divider-accent w-80 mx-auto"></div>
            <div className="flex flex-col w-full mx-4 py-4 px-6">
                <div className="card bg-base-300 rounded-box place-items-center">
                    <p className="px-4">{bookDetail.content}</p>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-3xl capitalize py-4">Flash Cards</h2>
            </div>
            <div className="divider divider-accent w-80 mx-auto"></div>
            <Carousel flashCardDetail={ flashCardDetail} />
        </div>
    );
};

export default BookPage;