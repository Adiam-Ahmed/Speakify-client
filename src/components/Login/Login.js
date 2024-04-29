import './Login.scss'
import { useState, useEffect } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CTAButton from '../UI/CTAButton/CTAButton';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from "gapi-script";


const clientId = process.env.ClientID 

const Login = () => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    var accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken)


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const handleLogin = async e => {
        e.preventDefault()

    }

    const onSuccess = (res)=>{
        console.log("Login Sucess Current user", res.profileObj)
    }

    const onFailure = (res) =>{
        console.log('Login failed! res:', res)
    }

    const onSuccessLogout = (res) => {
        console.log("Login Sucess Current user", res.profileObj)
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
            <p>No account? Sign Up here or using Google Account</p>
            <div className='sign-in-google'>
            <GoogleLogin 
                clientId= {clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn= {true}
            />
            </div>
            <div className='sign-out'>
                <GoogleLogout
                    clientId={clientId}
                    buttonText={'Logout'}
                    onSuccess={onSuccessLogout}
                />
            </div>
            
        </section>
    )
}

export default Login