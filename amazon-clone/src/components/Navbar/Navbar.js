import React from 'react'
import { useStateValue } from '../../StateProvider';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

    const [{basket,user},dispatch] = useStateValue();

    const navigate = useNavigate();


    const signInHandler = () => {
        navigate('/login');
        alert('You must be signed in to view your returns and orders!')
    }


    const signOutHandler = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        });

        localStorage.removeItem('user');
        navigate('/')
    }

  return (
    <div className='navbar'>
        <div className='inner'>
            <div className='navbar-logo' onClick={() => navigate('/')}>
                <img src='Amazon-Logo-Black.jpg' alt=''/>
            </div>
            <div className='search-bar'>
                    <input type='text' placeholder='Search...' />
                <div className='search-icon' onClick={() => navigate('/addproduct')} >
                    <img src='amazonLogo2.png' alt=''/>
                </div>
            </div>

            <div className='right-box'>
            <div className='nav-buttons' onClick={user ? () => signOutHandler() : () => navigate('/login')}>
            <p>Hello,</p>
            <p>{user ? user?.fullName : 'Guest'}</p>
            </div>
            <div className='nav-buttons' onClick={!user ? () => signInHandler() : () => navigate('/orders')}>
            <p>Returns</p>
            <p>& Orders</p>
            </div>
            <div className='basket-button' onClick={() => navigate('/checkout')}>
                <img src='blackAmazonlogo.jpg' alt=''/>
                <p>{basket?.length ? basket?.length : 0}</p>
            </div>
             </div>
        </div>
        <div className='mobile-search-bar'>
            <input type='text' placeholder='Search...' />
            <div className='search-icon' onClick={() => navigate('/addproduct')}>
                <img src='amazonLogo2.png' alt=''/>
            </div>
  </div>
  </div>
  )
}

export default Navbar
