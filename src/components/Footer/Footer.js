import React from 'react';
import logo from '../../assests/Logo/speakify-favicon-white.png'
import './Footer.scss'

const Footer = () => {
    return (
        <div >
            <div className='footer'>
                <img className='footer__icon' src={logo} alt="footer logo" />
            </div>

        </div>
    );
};

export default Footer;