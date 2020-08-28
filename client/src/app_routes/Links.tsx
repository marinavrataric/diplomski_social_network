import React, { useState, useContext } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './router.css';

import Logout from '../modals/Logout';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Links() {
    const { currentUser } = useContext(CurrentUserContext);
    const [modalLogout, setModalLogout] = useState(false);

    const toggleLogout = () => setModalLogout(!modalLogout);

    return (
        <Nav className="nav">
            <div className="nav-left">
                <NavItem className="nav-item">
                    <NavLink to="/" className="nav-link" activeStyle={{ color: 'rgb(35, 204, 255)' }}>
                        Social network
                    </NavLink>
                </NavItem>
            </div>
            <div className="nav nav-right">
                <NavItem className="nav-item">
                    <NavLink
                        to={() => (currentUser ? '/findPeople' : '/')}
                        className="nav-link"
                        activeStyle={{ color: 'rgb(35, 204, 255)' }}
                    >
                        Find people
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        to={() => (currentUser ? '/posts' : '/')}
                        className="nav-link"
                        activeStyle={{ color: 'rgb(35, 204, 255)' }}
                    >
                        Posts
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        to={() => (currentUser ? '/myProfile' : '/')}
                        className="nav-link"
                        activeStyle={{ color: 'rgb(35, 204, 255)' }}
                    >
                        My profile
                    </NavLink>
                </NavItem>
                {currentUser && <button className='nav-item-logout' onClick={() => toggleLogout()}>Log out</button>}
                {modalLogout && <Logout toggle={toggleLogout} />}
            </div>
        </Nav>
    );
}

export default Links;
