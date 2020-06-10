import React from 'react';
import { Carousel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import './styles.css';

import carouselImage1 from '../../assets/carousel/1.jpg';
import carouselImage2 from '../../assets/carousel/2.jpg';
import carouselImage3 from '../../assets/carousel/3.jpg';

import guyImage from '../../assets/home-person.png';

const Home = () => {
    return (
        <>
            <Layout>
                <Carousel controls={false} indicators={false} interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage1}
                            alt="f"
                        />
                        <Carousel.Caption className="caption">
                            <h3>Promoções de forma fácil</h3>
                            <p>Consiga promoções em cervejarias e bares de uma forma simples e fácil!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage2}
                            alt="s"
                        />
                        <Carousel.Caption className="caption">
                            <h3>Seus lugares favoritos</h3>
                            <p>Obtenha cupons de desconto para seu bar favorito!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage3}
                            alt="t"
                        />
                        <Carousel.Caption className="caption">
                            <h3>Seu bar com a gente</h3>
                            <p>Quer angariar a clientela com promoções? Cadastre seu bar com a gente!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="separator"></div>
                <div className="content mt-3 mb-3">
                    <Row className="mt-3 mb-3">
                        <Col>
                            <h3>Promoções em bares e cervejarias de Curitiba</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi officia enim provident blanditiis ducimus velit. Error repellendus nobis quia dolores inventore quam, consequatur ratione, eum modi eveniet numquam quae porro.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi officia enim provident blanditiis ducimus velit. Error repellendus nobis quia dolores inventore quam, consequatur ratione, eum modi eveniet numquam quae porro.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi officia enim provident blanditiis ducimus velit. Error repellendus nobis quia dolores inventore quam, consequatur ratione, eum modi eveniet numquam quae porro.
                            </p>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Button variant="outline-light" size="lg" block>
                                        Começar agora
                                    </Button>
                                </Link>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <img
                            src={guyImage}
                            className="main-image"
                            alt="Guy"
                            >
                            </img>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
        
    );
}

export default Home;