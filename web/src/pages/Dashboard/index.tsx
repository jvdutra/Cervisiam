import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Layout from '../../components/Layout';
import api from '../../services/api';

import businessPicture from '../../assets/business.jpg';

import './styles.css';

interface Coupon {
    id: number,
    type: string,
    value: number
    business: {
        id: number,
        name: string,
        uf: string,
        city: string,
        latitude: number,
        longitude: number
    }
}

const Dashboard = () => {
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();
    const [coupons, setCoupons] = useState<Coupon[]>();

    useEffect(() => {
        api.get(`/coupons`).then(async res => {
            const couponsResponse = res.data;
            const couponsList: Coupon[] = [];

            await couponsResponse.map((coupon: Coupon) => {
                const parsedCoupon = {
                    id: coupon.id,
                    type: coupon.type,
                    value: coupon.value,
                    business: {
                        id: coupon.business.id,
                        name: coupon.business.name,
                        uf: coupon.business.uf,
                        city: coupon.business.city,
                        latitude: coupon.business.latitude,
                        longitude: coupon.business.longitude
                    }
                }

                return couponsList.push(parsedCoupon);
            });

            setCoupons(couponsList);
        });
    }, []);

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
                        <Modal.Title>Cupom para {selectedCoupon?.business.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Map 
                        style={{ height: "350px" }} 
                        center={[Number(selectedCoupon?.business.latitude), Number(selectedCoupon?.business.longitude)]} 
                        zoom={14}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[Number(selectedCoupon?.business.latitude), Number(selectedCoupon?.business.longitude)]} />
                        </Map>

                        <p>
                            <strong>Localização:</strong><br></br>
                            { `${selectedCoupon?.business.city}/${selectedCoupon?.business.uf}` }
                        </p>
                        <p>
                            <strong>Cupom:</strong><br></br>
                            { 
                                selectedCoupon?.type === 'DISCOUNT' ?
                                `R$ ${selectedCoupon?.value}` :
                                `${selectedCoupon?.value}% OFF`
                            }
                        </p>
                    </Modal.Body>
                </Modal>

                <h1>Cupons disponíveis</h1>
                <div className="separator mb-3"></div>
                <div className="coupons-content mb-3">
                    <Row>
                        {coupons?.map((coupon: Coupon) => (
                            <Col md="4" className="mb-5" key={coupon.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={businessPicture} />
                                    <Card.Body>
                                        <Badge variant="danger" className="mb-3" style={{ fontSize: 18 }}>
                                            {
                                                coupon.type === 'DISCOUNT' ?
                                                `R$ ${coupon.value}` :
                                                `${coupon.value}% OFF`
                                            }
                                        </Badge>
                                        <Card.Title>
                                            { coupon.business.name } 
                                        </Card.Title>
                                        <Card.Text>
                                            Em { `${coupon.business.city}/${coupon.business.uf}` }
                                        </Card.Text>
                                        <Button variant="warning" onClick={() => handleViewCouponInformation(coupon)}>Ver</Button>
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