import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <img
                                alt="Cervisiam"
                                src={logo}
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <Link to="/login" className="header-link">
                                    Login
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/register" className="header-link">
                                    Registro
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>   
    );
}

export default Header;