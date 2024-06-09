import './Register.scss'
import { useState } from 'react'
import CTAButton from '../UI/CTAButton/CTAButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;



const Register = () => {

    const [fieldErrors, setFieldErrors] = useState({})

    const validateForm = (values) => {
        const errors = {}
        if (!values.username || values.username.length < 3 ) {
            errors.username = 'Username must be at least 3 character';
        }
        if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.name || values.name.length < 3) {
            errors.name = 'Name must be at least 3 character';
        }
        if (!values.password || values.password.length < 6 ) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        if (!values.confirmPassword || values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords must match';
        }
        // Update the fieldErrors state
        setFieldErrors(errors);

        return errors

    }

    const navigate = useNavigate()


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
        <>
            <Formik
                initialValues={{
                    username: '', // Initial value for username
                    email: '', // Initial value for email
                    name: '', // Initial value for name
                    password: '', // Initial value for password
                    confirmPassword: '', // Initial value for confirm password
                }}
                validate={validateForm} // Use custom validation function
                onSubmit={async (values, { setSubmitting }) => {
                    const { username, email, name, password } = values;

                    try {
                        const signUpRes = await axios.post(`${SERVER_URL}/auth/signup`, {
                            email,
                            username,
                            name,
                            password,
                        });

                        if (signUpRes.status === 201) {
                            const loginRes = await axios.post(`${SERVER_URL}/auth/login`, { username , password });

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
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, touched }) => (
                    <Form>
                        <section className='signup'>
                            <h1 className='signup__header'> User Sign Up</h1>
                            {/* Username Field */}
                            <div className='signup__container'>
                                <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder='Username'
                                    className={touched.username && fieldErrors.username ? 'signup__error-border' : 'signup__input'}
                                /> {/* Input for username */}
                                
                            </div>
                            <ErrorMessage name="username" component="div" className="error-message" />{/* Error message for username */}
                            {/* Name Field */}
                            <div className='signup__container'>
                                <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder='Name'
                                    className={touched.name && fieldErrors.name ? 'signup__error-border' : 'signup__input'}
                                /> {/* Input for name */}
                               
                            </div>
                            <ErrorMessage name="name" component="div" className=" error-message" /> {/* Error message for name */}
                            {/* Email Field */}
                            <div className='signup__container'>
                                <AlternateEmailOutlinedIcon sx={{ fontSize: 35 }} />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    className={touched.email && fieldErrors.email ? 'signup__error-border' : 'signup__input'}
                                /> {/* Input for email */}
                                
                            </div>
                            <ErrorMessage name="email" component="div" className="error-message" /> {/* Error message for email */}
                            {/* Password Field */}
                            <div className='signup__container'>
                                <LockOpenIcon sx={{ fontSize: 35 }} />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    className={touched.password && fieldErrors.password ? 'signup__error-border' : 'signup__input'}
                                /> {/* Input for Password */}
                                
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" /> {/* Error message for Password */}
                            {/* Confirm password Field */}
                            <div className='signup__container'>
                                <LockOutlinedIcon sx={{ fontSize: 35 }} />
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    className={touched.confirmPassword && fieldErrors.confirmPassword ? 'signup__error-border' : 'signup__input'}
                                /> {/* Input for Confirm password */}
                                
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" /> {/* Error message for Confirm password */}
                            <div className='signup__container'>
                                <CTAButton className="button-add" text="signup" btnType="hero" type="submit" disabled={isSubmitting} />
                            </div>
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
                    </Form>
                )}
                
            </Formik>

        </>

    )
};

export default Register;