import React from 'react';
import './Header.scss'
import Logo from '../../assests/Logo/speakify-favicon-white.png'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';


const Header = () => {
    return (
        <header className='header'>
            <div className='header__container'>
                <img
                    src={Logo}
                    alt='logo'
                    className='header__icon'
                />
                <h3 className='header__logo'>SPEAKIFY</h3>
            </div>
            <div className='header__profile-icon'>
                <PersonOutlinedIcon sx={{ fontSize: 60 }} />
            </div>

            

        </header>
    );
};

export default Header;

