import './Register.scss'
import { useState } from 'react'
import CTAButton from '../UI/CTAButton/CTAButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const navigate = useNavigate()


    const handleUsernameChange = e => setUsername(e.target.value)
    const onNameChange = e => setName(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handleConfirmPasswordChange = e => setconfirmPassword(e.target.value)

    const handleSignup = async e => {
        e.preventDefault()

        try {
            const signUpRes = await axios.post(`${SERVER_URL}/auth/signup`, {
                email,
                username,
                name,
                password
            });

            if (signUpRes.status === 201) {
                const loginRes = await axios.post(`${SERVER_URL}/auth/login`, { username, password });

                if (loginRes.status === 200) {
                    console.log('Auth Token: ', loginRes.data.token);
                    // If the login is successful, store the returned token in localStorage
                    localStorage.setItem('authToken', loginRes.data.token)
                    // Then redirect to profile page
                    navigate('/profile')
                } else {
                    navigate('/login')
                }
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }


    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/googleSignUp`, { credentialResponse });

            if (response.status === 200) {
                navigate('/profile')
                console.log('Data sent to backend successfully');
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <section className='signup'>
            <h1 className='signup__header'> User Sign Up</h1>
            <form>
                <div className='signup__container'>
                    <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="user_name" className='signup__box'>
                        <input
                            className='signup__input'
                            type="text"
                            id="user_name"
                            name='user_name'
                            placeholder='Username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                </div>
                <div className='signup__container'>
                    <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="name" className='signup__box'>
                        <input
                            className='signup__input'
                            type="text"
                            id="name"
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={onNameChange}
                        />
                    </label>
                </div>
                <div className='signup__container'>
                    <AlternateEmailOutlinedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="email" className='signup__box'>
                        <input
                            className='signup__input'
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </label>
                </div>
                <div className='signup__container'>
                    <LockOpenIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="password" className='signup__box'>
                        <input
                            className='signup__input'
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                </div>
                <div className='signup__container'>
                    <LockOutlinedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="confirmPassword" className='signup__box'>
                        <input
                            className='signup__input'
                            type="password"
                            id="confirm-password"
                            name='confirm-password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </label>
                </div>
                <div className='signup__container'>
                    <CTAButton className="button-add" text="signup" btnType="hero" onClick={handleSignup} />
                </div>
            </form>
            <p className='login__paragraph'>Already have Account? Login in <span className='login__bold-primary text-primary'><Link to='/login'>here</Link> </span>or Sign up using Google</p>
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
};

export default Register;