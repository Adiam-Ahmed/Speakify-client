import './Login.scss'
import { useState, useEffect } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CTAButton from '../UI/CTAButton/CTAButton';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_ClientID;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function start() {
            await gapi.auth2.init({
                clientId: clientId,
                scope: ''
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Validate username and password
        // Perform login action
        // Example: send login request to server
        setLoading(false);
    };

    const onSuccess = (res) => {
        console.log('Login Success. Current user:', res.profileObj);
    };

    const onFailure = (res) => {
        console.error('Login failed. Error:', res.error);
        setError('Login failed. Please try again.');
    };

    const onSuccessLogout = (res) => {
        console.log('Logout Success. Current user:', res.profileObj);
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
            {error && <p className="error">{error}</p>}
            <p>No account? Sign Up here or using Google Account</p>
            <div className="sign-in-google">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                    disabled={loading}
                />
            </div>
            <div className="sign-out">
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSuccessLogout}
                    disabled={loading}
                />
            </div>
        </section>
    );
};

export default Login;
