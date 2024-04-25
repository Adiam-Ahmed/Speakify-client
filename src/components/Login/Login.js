import './Login.scss'
import { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CTAButton from '../UI/CTAButton/CTAButton';



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const handleLogin = async e => {
        e.preventDefault()

    }

    return (
        <section className='login'>
            <h1 className='login__header'> User Login</h1>
            <form>
                <div className='login__container'>
                    <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="user_name" className='login__box'>
                        <input
                            className='login__input'
                            type="text"
                            id="user_name"
                            name='user_name'
                            placeholder='Username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                </div>
                <div className='login__container'>
                    <LockOpenIcon sx={{ fontSize: 35 }} />
                    <label htmlFor="password" className='login__box'>
                        <input
                            className='login__input'
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                </div>
                <div className='login__container'>
                    <CTAButton className="button-add" text="Login" btnType="hero" onClick={handleLogin} />
                </div>
            </form>
            <p>No account? Sign Up here</p>
        </section>
    )
}

export default Login