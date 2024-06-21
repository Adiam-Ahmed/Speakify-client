import './Profile.scss'
import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
import Main from '../Main/Main';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handleLogout = (navigate) => {
    localStorage.removeItem('authToken');
    navigate('/login');
}


const Profile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getUserInfo = async authToken => {
            try {
                const getProfRes = await axios.get(`${SERVER_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (getProfRes.status === 200) {
                    // console.log('Profile Data: ', getProfRes.data);
                    setUserInfo(getProfRes.data);
                    setIsLoading(false);
                    localStorage.setItem('userId', getProfRes.data.id);
                } else {
                    handleLogout();
                }
            } catch (err) {
                handleLogout();

            }
        };
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            getUserInfo(authToken);
        }
    }, [navigate]);

    


    if (isLoading) return <h1>Loading...</h1>

    return (
        <main className='main-container'>
            <Main userId={userInfo.id} />
        </main>
    )
}

export default Profile