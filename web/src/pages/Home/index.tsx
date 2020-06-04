import React from 'react';
import { Carousel } from 'react-bootstrap';

import Layout from '../../components/Layout';
import './styles.css';

import carouselImage1 from '../../assets/carousel/1.jpg';
import carouselImage2 from '../../assets/carousel/2.jpg';
import carouselImage3 from '../../assets/carousel/3.jpg';

const Home = () => {
    return (
        <div id="home">
            <Layout>
                <Carousel controls={false} indicators={false}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage1}
                            alt="f"
                        />
                        <Carousel.Caption>
                            <h3>First label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage2}
                            alt="s"
                        />
                        <Carousel.Caption>
                            <h3>Second label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage3}
                            alt="t"
                        />
                        <Carousel.Caption>
                            <h3>Third label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Layout>
        </div>
        
    );
}

export default Home;