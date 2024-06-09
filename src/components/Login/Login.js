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
    const [fieldErrors, setFieldErrors] = useState({})
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate()

    const validateForm = () => {
        const errors = {}

        if (!formData.username.trim()) {
            errors.username = "username is required"
        }
        if (!formData.password.trim()) {
            errors.password = "password is required"
        }
        setFieldErrors(errors)

        console.log(errors)

        return errors
    }

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async e => {
        e.preventDefault()
        const isValid = validateForm();

        if (isValid) {

            try {
                const loginRes = await axios.post(`${SERVER_URL}/auth/login`, { username, password });

                if (loginRes.status === 200) {
                    localStorage.setItem('authToken', loginRes.data.token);
                    handleLoginHeader();
                    navigate('/profile');
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.log("User not found");
                } else {
                    console.error("Login failed:", err);
                    navigate('/login');
                }
            }
        }
    }

    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/googleSignUp`, { credentialResponse });
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token)
                handleLoginHeader()
                navigate('/profile')
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };


    return (
        <>
            <section className="login">
                <h1 className="login__header">User Login</h1>
                <div className="flex flex-col w-full lg:flex-row  justify-center ">
                    <section className='col-one'>
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
                                    />
                                    {fieldErrors.username && <p className="error-message">{fieldErrors.username}</p>}
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
                                    />
                                    {fieldErrors.password && <p className="error-message">{fieldErrors.password}</p>}
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
                    </section>
                    <div className="divider divider-primary lg:divider-horizontal my-4 lg:mx-4"></div>
                    <section className='col-two flex flex-col justify-evenly gap-15'>
                        <p className='login__paragraph'>No account? <br />  Sign Up <span className='login__bold-primary text-primary'><Link to='/signup'>here</Link></span> or login using Google Account</p>
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
                </div>
            </section>
        </>



    )
}

export default Login;
