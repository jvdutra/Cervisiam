import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Layout from '../../components/Layout';
import businessPicture from '../../assets/business.jpg';

import './styles.css';

interface Coupon {
    id: number,
    coupon: {
        id: number,
        type: string,
        value: number
    },
    business: {
        id: number,
        name: string,
        uf: string,
        city: string,
        latitude: number,
        longitude: number
    }
}

const coupons: Coupon[] = [
    {
        id: 5,
        coupon: {
            id: 1,
            type: 'DISCOUNT',
            value: 10
        },
        business: {
            id: 1,
            name: 'Bar do Dilson',
            uf: 'PR',
            city: 'Curitiba',
            latitude: -25.431881,
            longitude: -49.278231
        }
    },
    {
        id: 4,
        coupon: {
            id: 1,
            type: 'DISCOUNT',
            value: 10
        },
        business: {
            id: 1,
            name: 'Bar do Dilson',
            uf: 'PR',
            city: 'Curitiba',
            latitude: -25.433121,
            longitude: -49.283702
        }
    },
    {
        id: 3,
        coupon: {
            id: 1,
            type: 'PERCENTAGE',
            value: 10
        },
        business: {
            id: 1,
            name: 'Bar do Dilson',
            uf: 'PR',
            city: 'Curitiba',
            latitude: -25.436066,
            longitude: -49.283981
        }
    }
]

const myCoupons: Coupon[] = [
    {
        id: 1,
        coupon: {
            id: 1,
            type: 'PERCENTAGE',
            value: 10
        },
        business: {
            id: 1,
            name: 'Bar roxo',
            uf: 'PR',
            city: 'Curitiba',
            latitude: -25.433082,
            longitude: -49.280055
        }
    },
    {
        id: 2,
        coupon: {
            id: 1,
            type: 'DISCOUNT',
            value: 10
        },
        business: {
            id: 1,
            name: 'Da Dilsa',
            uf: 'PR',
            city: 'Curitiba',
            latitude: -25.436008,
            longitude: -49.279411
        }
    }
]

const Dashboard = () => {
    const [infoModalShow, setInfoModalShow] = useState(false);

    const [selectedCoupon, setSelectedCoupon] = useState({
        coupon: {
            id: 0,
            type: '',
            value: 0
        },
        business: {
            id: 0,
            name: '',
            uf: '',
            city: '',
            latitude: 0,
            longitude: 0
        }
    });

    function handleViewCouponInformation(coupon: Coupon) {
        setSelectedCoupon(coupon);
        return setInfoModalShow(true);
    }

    function handleCloseInfoModal() {
        return setInfoModalShow(false);
    }

    return (
        <div id="dashboard">
            <Layout>
                <Modal centered show={infoModalShow} onHide={handleCloseInfoModal}>
                    <Modal.Header>
                        <Modal.Title>Cupom para {selectedCoupon.business.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Map center={[selectedCoupon.business.latitude, selectedCoupon.business.longitude]} zoom={14}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[selectedCoupon.business.latitude, selectedCoupon.business.longitude]} />
                        </Map>

                        <p>
                            <strong>Localização:</strong><br></br>
                            { `${selectedCoupon.business.city}/${selectedCoupon.business.uf}` }
                        </p>
                        <p>
                            <strong>Cupom:</strong><br></br>
                            { 
                                selectedCoupon.coupon.type === 'DISCOUNT' ?
                                `R$ ${selectedCoupon.coupon.value}` :
                                `${selectedCoupon.coupon.value}% OFF`
                            }
                        </p>
                    </Modal.Body>
                </Modal>

                <h1>Seus cupons</h1>
                <div className="separator mb-3"></div>
                <div className="coupons-content mb-3">
                    <Row>
                        {myCoupons.map((myCoupon: Coupon) => (
                            <Col md="4" key={myCoupon.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={businessPicture} />
                                    <Card.Body>
                                        <Badge variant="danger" className="mb-3" style={{ fontSize: 18 }}>
                                            {
                                                myCoupon.coupon.type === 'DISCOUNT' ?
                                                `R$ ${myCoupon.coupon.value}` :
                                                `${myCoupon.coupon.value}% OFF`
                                            }
                                        </Badge>
                                        <Card.Title>
                                            { myCoupon.business.name } 
                                        </Card.Title>
                                        <Card.Text>
                                            Em { `${myCoupon.business.city}/${myCoupon.business.uf}` }
                                        </Card.Text>
                                        <Button variant="warning" onClick={() => handleViewCouponInformation(myCoupon)}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <h1>Cupons disponíveis</h1>
                <div className="separator mb-3"></div>
                <div className="coupons-content mb-3">
                    <Row>
                        {coupons.map((coupon: Coupon) => (
                            <Col md="4" key={coupon.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={businessPicture} />
                                    <Card.Body>
                                        <Badge variant="danger" className="mb-3" style={{ fontSize: 18 }}>
                                            {
                                                coupon.coupon.type === 'DISCOUNT' ?
                                                `R$ ${coupon.coupon.value}` :
                                                `${coupon.coupon.value}% OFF`
                                            }
                                        </Badge>
                                        <Card.Title>
                                            { coupon.business.name } 
                                        </Card.Title>
                                        <Card.Text>
                                            Em { `${coupon.business.city}/${coupon.business.uf}` }
                                        </Card.Text>
                                        <Button variant="warning" className="mr-1">Pegar cupom</Button>
                                        <Button variant="warning">Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Layout>
        </div>
    );
}

export default Dashboard;