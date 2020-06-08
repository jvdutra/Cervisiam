import React from 'react';
import { Container } from 'react-bootstrap';

import './style.css';

const Footer = () => {
    return (
        <footer className="footer bg-white">
            <Container>
                &copy; 2020 Cervisiam
            </Container>
        </footer>
    );
}

export default Footer;