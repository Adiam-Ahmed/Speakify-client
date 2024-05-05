import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


import Main from '../Main/Main';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
    }, []);

    

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    if (isLoading) return <h1>Loading...</h1>

    return (
        <>
            <h1>Welcome {userInfo.username}!</h1>
            <Main userId={userInfo.id} />
            <Link to="/" onClick={handleLogout}>
                Logout
            </Link>
        </>
    )
}

export default Profile