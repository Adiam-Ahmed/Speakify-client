import { useEffect, useState } from 'react'
import './Header.scss'
import Logo from '../../assests/Logo/speakify-favicon-white.png'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Header = ({ loginTimestamp }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();

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
                    setIsLoggedIn(true);
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
    }, [ loginTimestamp ]);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <header className='header'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <img
                        src={Logo}
                        alt='logo'
                        className='header__icon'
                    />
                    <h3 className="text-lg font-bold" href='logo'>SPEAKIFY</h3>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    {isLoggedIn ? (
                        <h1>Welcome {userInfo.username}!</h1>
                    ) : (
                        <></>
                    )}
                    <div className="flex items-stretch">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><PersonOutlinedIcon sx={{ fontSize: 50 }} /></div>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                {isLoggedIn ? (
                                    <li onClick={handleLogout}><Link to='/login'>Logout</Link></li>
                                ) : (
                                    <>
                                        <li><Link to='/login'>Login</Link></li>
                                        <li><Link to='/signup'>Sign Up </Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;

