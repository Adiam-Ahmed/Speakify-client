import './Register.scss'
import { useState } from 'react'
import CTAButton from '../UI/CTAButton/CTAButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')



    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setEmail(e.target.value)
    const handleEmailChange = e => setPassword(e.target.value)
    const handleConfirmPasswordChange = e => setconfirmPassword(e.target.value)

    const handlesignup = async e => {
        e.preventDefault()

    }
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
                    <CTAButton className="button-add" text="signup" btnType="hero" onClick={handlesignup} />
                </div>
            </form>
            <p>Already have Account? Login in here or Sign up using Google</p>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </section>
    )
};

export default Register;