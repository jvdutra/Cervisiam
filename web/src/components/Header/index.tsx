import React, { Fragment } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles.css';

import logo from '../../assets/logo.png';
import AuthApi from '../../services/auth';

const Header = () => {
    const Auth = React.useContext(AuthApi);

    function handleLogout() {
        Auth.setAuth({
            logged: false,
            user: {
                id: -1
            }
        });
        
        Cookies.remove('SESSION');
        Cookies.remove('USER_ID');
    }

    return (
        <header>
            <Navbar expand="lg">
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
                            { Auth.auth.logged ?
                                <Fragment>
                                    <Nav.Link as={Link} to="/businesses" className="header-link">
                                    Meus estabelecimentos
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard" className="header-link">
                                        Explorar cupons
                                    </Nav.Link>
                                    <Nav.Link onClick={handleLogout} as={Link} to="/" className="header-link">
                                        Sair
                                    </Nav.Link>
                                </Fragment>
                                :
                                <Fragment>
                                    <Nav.Link as={Link} to="/login" className="header-link">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register" className="header-link">
                                        Registro
                                    </Nav.Link>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>   
    );
}

export default Header;