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
    const listRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (!listRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        console.log(showMenu)
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const listClassName = "navigationTop" + (showMenu ? "" : " hidden");
    
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to='/spots/new' className='newSpot'>Create A Spot</NavLink>
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
                    <ul className={listClassName} ref={listRef}>
                        <div className='buttonContainer'>
                            <OpenModalButton
                                buttonText="Log In"
                                className='loginModal'
                                modalComponent={<LoginFormModal />}
                            />

                            <OpenModalButton
                                buttonText="Sign Up"
                                className='signupModal'
                                modalComponent={<SignupFormModal />}
                            />

                        </div>
                    </ul>

                </ul>
            </>

        );
    }
    return (
        <ul className='navigationBar'>
            <>
                <NavLink to="/" className='logoLink'><i className="fa-brands fa-airbnb"></i> YurrBnB </NavLink>
            </>

            <div className='newSpotNav'>
                {/* <NavLink to='/spots/new' className='newSpot'>Create A Spot</NavLink> */}
                {isLoaded && sessionLinks}
            </div>

        </ul>
    );
}

export default Navigation;
