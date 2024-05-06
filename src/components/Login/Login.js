import './Login.scss'
import { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CTAButton from '../UI/CTAButton/CTAButton';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;




const Login = ({ handleLoginHeader }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const loginRes = await axios.post(`${SERVER_URL}/auth/login`, { username, password });

            if (loginRes.status === 200) {
                console.log('Auth Token: ', loginRes.data.token);

                // If the login is successful, store the returned token in localStorage
                localStorage.setItem('authToken', loginRes.data.token)
                handleLoginHeader()

                // Then redirect to profile page
                navigate('/profile')
                
            } else {
                navigate('/login')
                
            }
        } catch (err) {
            navigate('/login')
        }

    }

    

    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/googleSignUp`, { credentialResponse });
            console.log(credentialResponse.credential)

            if (response.status === 200) {
                console.log('Auth Token: ', response.credential);

                // If the login is successful, store the returned token in localStorage
                localStorage.setItem('authToken', response.data.token)

                // Then redirect to profile page
                navigate('/profile')
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };


    return (
        <section className="login glass">
            <h1 className="login__header">User Login</h1>
            <form onSubmit={handleLogin}>
                <div className="login__container">
                    <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="login_username" className="login__box">
                        <input
                            className="login__input"
                            type="text"
                            id="login_username"
                            name="user_name"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </label>
                </div>
                <div className="login__container">
                    <LockOpenIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="login_password" className="login__box">
                        <input
                            className="login__input"
                            type="password"
                            id="login_password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </label>
                </div>
                <div className="login__container">
                    <CTAButton
                        className="button-add"
                        text={'Login'}
                        btnType="hero"
                    />
                </div>
            </form>
            <p className='login__paragraph'>No account? Sign Up <span className='login__bold-primary'><Link to='/signup'>here</Link></span> or login using Google Account</p>
            <div className="sign-in-google">
                <GoogleLogin
                    onSuccess={handleGoogleSignUp}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
           

        </section>
    )
}

export default Login;
