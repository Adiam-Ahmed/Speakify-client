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
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [fieldErrors, setFieldErrors] = useState({})
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

        // Return true if no errors
        return Object.keys(errors).length === 0;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            try {
                const loginRes = await axios.post(`${SERVER_URL}/auth/login`, { 
                    username: formData.username,
                    password: formData.password,
                 });

                if (loginRes.status === 200) {
                    localStorage.setItem('authToken', loginRes.data.token);
                    handleLoginHeader();
                    navigate('/profile');
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setFieldErrors(prevErrors => ({
                        ...prevErrors,
                        general: "User not found",
                    }));
                } else {
                    setFieldErrors(prevErrors => ({
                        ...prevErrors,
                        general: "Login failed. Please try again.",
                    }));
                }
                console.error("Login failed:", err);
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
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
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
                                        value={formData.password}
                                        onChange={handleChange}
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
