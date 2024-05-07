import React from 'react';
import logo from '../../assests/Logo/speakify-favicon-white.png'
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                <img className='footer__icon' src={logo} alt="footer logo" />
                <p>Copyright © 2024 - All right reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;