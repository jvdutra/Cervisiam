import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Layout from '../../components/Layout';
import businessPicture from '../../assets/business.jpg';
import api from '../../services/api';
import './styles.css';

interface Coupon {
    id: number,
    type: string,
    value: number
}

interface Business {
    id: number,
    name: string,
    uf: string,
    city: string,
    latitude: number,
    longitude: number,
    coupons: Coupon[]
}

const myBusinesses: Business[] = [
    {
        id: 1,
        name: 'Bar do Nene',
        uf: 'PR',
        city: 'Curitiba',
        latitude: -25.433082,
        longitude: -49.280055,
        coupons: [
            {
                id: 1,
                type: 'DISCOUNT',
                value: 10
            }
        ]
    },
    {
        id: 2,
        name: 'Bar do Mano',
        uf: 'PR',
        city: 'Curitiba',
        latitude: -25.433082,
        longitude: -49.280055,
        coupons: [
            {
                id: 1,
                type: 'PERCENTAGE',
                value: 10
            }
        ]
    },
    {
        id: 3,
        name: 'Bar da Dinda',
        uf: 'PR',
        city: 'Curitiba',
        latitude: -25.433082,
        longitude: -49.280055,
        coupons: [
            {
                id: 1,
                type: 'DISCOUNT',
                value: 10
            }
        ]
    },
]

const BusinessRegistration = () => {
    const [createCouponModalShow, setCreateCouponModalShow] = useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<Business>();
    const [formData, setFormData] = useState({
        businessId: 0,
        type: '',
        value: ''
    });

    function handleOpenCreateCouponModal(business: Business) {
        setSelectedBusiness(business);
        return setCreateCouponModalShow(true);
    }

    function handleCloseCreateCouponModal(business: Business) {
        setSelectedBusiness(business);
        return setCreateCouponModalShow(false);
    }

    function handleCloseBusinessInfoModal() {
        return setInfoModalShow(false);
    }

    function handleOpenBusinessInfoModal(business: Business) {
        setSelectedBusiness(business);
        return setInfoModalShow(true);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        const { type, value, businessId } = formData;

        const coupon = {
            businessId,
            type,
            value
        }

        console.log(coupon);
        return;

        //handleOpenLoadingModal();

        await api.post('/coupons', coupon)
        .then(() => {
            //handleCloseLoadingModal();

            //handleOpenModal('Cadastrado com sucesso!', 'Agora entre em sua conta utilizando seu e-mail e senha.');

            setTimeout(() => {
                //handleCloseModal();
                //history.push('/login');
            }, 2000);
        }).catch(err => {
            // Erro
        });
    }

    return (
        <div id="business-registration">
            <Layout>
                <Modal centered show={createCouponModalShow} onHide={handleCloseCreateCouponModal}>
                    <Modal.Header>
                        <Modal.Title>Adicionar novo cupom</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" name="type">
                                    <option key="PERCENTAGE" value="PERCENTAGE">Desconto em porcentagem</option>
                                    <option key="DISCOUNT" value="DISCOUNT">Desconto em dinheiro</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="number" name="value" placeholder="% ou R$" required onChange={handleInputChange} value={formData.value} />
                            </Form.Group>

                            <Form.Control type="hidden" name="businessId" value={selectedBusiness?.id} />

                            <Button variant="warning" size="lg" block type="submit" onClick={handleFormSubmit}>
                                Cadastrar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal centered show={infoModalShow} onHide={handleCloseBusinessInfoModal}>
                    <Modal.Header>
                        <Modal.Title> { selectedBusiness?.name } </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Map 
                        style={{ height: "350px" }} 
                        center={[Number(selectedBusiness?.latitude), Number(selectedBusiness?.longitude)]} 
                        zoom={14}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[Number(selectedBusiness?.latitude), Number(selectedBusiness?.longitude)]} />
                        </Map>

                        <div>
                            <strong>Localização:</strong><br></br>
                            { `${selectedBusiness?.city}/${selectedBusiness?.uf}` }
                        </div>
                        <div>
                            <strong>Cupons:</strong><br></br>
                            <ul>
                            {selectedBusiness?.coupons.map((coupon: Coupon) => (
                                <li key={coupon.id}>
                                    {
                                        coupon.type === 'DISCOUNT' ?
                                        `R$ ${coupon.value}` :
                                        `${coupon.value}% OFF`
                                    }
                                </li>
                            ))}
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal>

                <h1>Seus estabelecimentos</h1>
                <div className="separator mb-3"></div>
                <div className="business-content mb-3">
                    <Row>
                        {myBusinesses.map((business: Business) => (
                            <Col md="4" key={business.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={businessPicture} />
                                    <Card.Body>
                                        <Card.Title>
                                            { business.name } 
                                        </Card.Title>
                                        <Card.Text>
                                            <div>
                                                <strong>Localização:</strong><br></br>
                                                { `${business.city}/${business.uf}` }
                                            </div>
                                            <div>
                                                <strong>Cupons:</strong><br></br>
                                                <ul>
                                                {business.coupons.map((coupon: Coupon) => (
                                                    <li key={coupon.id}>
                                                        {
                                                            coupon.type === 'DISCOUNT' ?
                                                            `R$ ${coupon.value}` :
                                                            `${coupon.value}% OFF`
                                                        }
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                        </Card.Text>
                                        <Button variant="warning" className="mr-1" onClick={() => handleOpenCreateCouponModal(business)}>Adicionar novo cupom</Button>
                                        <Button variant="warning" onClick={() => handleOpenBusinessInfoModal(business)}>Ver</Button>
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

export default BusinessRegistration;