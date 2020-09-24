import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../assets/images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt='Header' />
            <nav>
                <Link to='/shop'>Shop</Link>
                <Link to ='/review'>Order Review</Link>
                <Link to='/inventory'>Manage Inventory</Link>
                <button className='signout-btn' onClick={()=>setLoggedUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;