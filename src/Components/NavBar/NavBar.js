import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/loog42.png'
import './NavBar.css'

const NavBar = () => {
    return (
        <div className="navbar-style">
            <div className="container">
                <Navbar expand="lg">
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="logo" />
                            <span className="logo">
                                Car <span className="text-danger">Eleven</span></span>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/addCar" className="nav-link">Add Car</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        </div>
    );
};

export default NavBar;