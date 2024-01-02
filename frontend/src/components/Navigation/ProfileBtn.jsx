import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileBtn.css'
import { NavLink, useNavigate } from 'react-router-dom';



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const listRef = useRef();
    const navigate = useNavigate()

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

  const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        navigate('/')
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (!listRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const listClassName = "menuContainer" + (showMenu ? "" : " hidden");
    return (
        <>
            <ul>
                <button onClick={toggleMenu} className='openMenu'>
                    <i className="fa-solid fa-bars"></i>
                    <i className="fa-regular fa-user"></i>
                </button>
                <ul className={listClassName} ref={listRef}>
                    <ul className='greeting'><>Hello, {user.firstName}</></ul>
                    <ul className='emailText'>{user.email}</ul>
                    <ul className='manageSpots'> <NavLink to='/spots/current' onClick={toggleMenu} className='navContainer'>Manage Spots</NavLink></ul>
                    <ul className='logoutBtn'>
                        <button onClick={logout} className='button'>Log Out</button>
                    </ul>
                </ul>
            </ul>
        </>
    );
}

export default ProfileButton;
