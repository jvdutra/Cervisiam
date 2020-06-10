import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';

import './index.css';

interface Props {
    children: ReactNode
}

const Layout = (props: Props) => {
    return (
        <div id="layout">
           <Header />
                <Container style={{ color: '#fff' }}>
                    {props.children}
                </Container>
           <Footer />
        </div>
    );
}

export default Layout;