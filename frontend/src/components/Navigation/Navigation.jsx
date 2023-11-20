import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileBtn';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignUpFormModal/SignUpFormModal';
import { useEffect, useState, useRef } from 'react';
import './Navigation.css';
import '../OpenModalButton/OpenModalButton.css'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        // if (!showMenu) setShowMenu(true);
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // console.log('clicked: ' (e.target))
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        console.log(showMenu)
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const ulClassName = "nav-dropdown" + (showMenu ? "" : " hidden");
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <ul>

                    <button onClick={toggleMenu} className='menu'>
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-regular fa-user"></i>
                    </button>
                    <ul className={ulClassName} ref={ulRef}>
                        <div className='buttoncontainer'>
                            <OpenModalButton
                                buttonText="Log In"
                                className='login'
                                modalComponent={<LoginFormModal />}
                            />

                            <OpenModalButton
                                buttonText="Sign Up"
                                className='signup'
                                modalComponent={<SignupFormModal />}
                            />

                        </div>
                    </ul>

                </ul>
            </>

        );
    }
    //blah
    return (
        <ul className='navbar'>
            <>
                <NavLink to="/" className='homelink'><i className="fa-brands fa-airbnb"></i> YurrBnB </NavLink>
            </>
            {/* <ul>

            <button onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-regular fa-user"></i>
                </button>
            </ul> */}
            <div className='newSpotAndMenu'>
                <NavLink to='/spots/new' className='newSpot'>Create A Spot</NavLink>
                {isLoaded && sessionLinks}
            </div>

        </ul>
    );
}

export default Navigation;
