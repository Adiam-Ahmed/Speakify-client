import './Login.scss'
import { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CTAButton from '../UI/CTAButton/CTAButton';
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


   
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        setLoading(false);
    };


    return (
        <section className="login">
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
                        text={loading ? 'Logging in...' : 'Login'}
                        btnType="hero"
                        disabled={loading}
                    />
                </div>
            </form>
            <p>No account? Sign Up here or login using Google Account</p>
            <div className="sign-in-google">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </section>
    )
};

export default Login;
