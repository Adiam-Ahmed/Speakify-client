import React from 'react';
import './Header.scss'
import Logo from '../../assests/Logo/speakify-favicon-white.png'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className='header'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <img
                        src={Logo}
                        alt='logo'
                        className='header__icon'
                    />
                    <h3 className="text-lg font-bold" href='logo'>SPEAKIFY</h3>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><PersonOutlinedIcon sx={{ fontSize: 50 }} /></div>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Sign Up </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;

