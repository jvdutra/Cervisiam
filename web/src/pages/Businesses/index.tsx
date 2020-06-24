import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Layout from '../../components/Layout';
import businessPicture from '../../assets/business.jpg';
import api from '../../services/api';
import AuthApi from '../../services/auth';

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

const Businesses = () => {
    const Auth = React.useContext(AuthApi);
    const history = useHistory();

    const [initialPosition, setInitialPosition] = useState<[number, number]>([-23.4994227, -49.2819722]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    
    const [createCouponModalShow, setCreateCouponModalShow] = useState(false);
    const [createBusinessModalShow, setCreateBusinessModalShow] = useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);

    const [selectedBusiness, setSelectedBusiness] = useState<Business>();
    const [businesses, setBusinesses] = useState<Business[]>();

    const [couponFormData, setCouponFormData] = useState({
        businessId: -1,
        type: '',
        value: ''
    });

    const [businessFormData, setBusinessFormData] = useState({
        userId: -1,
        name: '',
        cnpj: '',
        uf: '',
        city: ''
    });

    useEffect(() => {
        api.get(`/businesses/user/${Auth.auth.user.id}`).then(async res => {
            const businessesResponse = res.data;
            const businessesList: Business[] = [];

            await businessesResponse.map((business: Business) => {
                const parsedBusiness = {
                    id: business.id,
                    name: business.name,
                    city: business.city,
                    uf: business.uf,
                    latitude: business.latitude,
                    longitude: business.longitude,
                    coupons: business.coupons
                }

                return businessesList.push(parsedBusiness);
            });

            setBusinesses(businessesList);
        });
    }, [Auth]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    function handleOpenCreateCouponModal(business: Business) {
        couponFormData.businessId = Number(business.id);
        return setCreateCouponModalShow(true);
    }

    function handleCloseCreateCouponModal() {
        setCouponFormData({
            businessId: -1,
            type: '',
            value: ''
        });

        return setCreateCouponModalShow(false);
    }

    function handleCloseBusinessInfoModal() {
        return setInfoModalShow(false);
    }

    function handleOpenBusinessInfoModal(business: Business) {
        setSelectedBusiness(business);
        return setInfoModalShow(true);
    }

    function handleOpenCreateBusinessModal() {
        return setCreateBusinessModalShow(true);
    }

    function handleCloseCreateBusinessModal() {
        return setCreateBusinessModalShow(false);
    }

    function handleCouponInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setCouponFormData({ ...couponFormData, [name]: value });
    }

    function handleBusinessInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setBusinessFormData({ ...businessFormData, [name]: value });
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    async function handleCouponSubmit(event: FormEvent) {
        event.preventDefault();

        const { type, value, businessId } = couponFormData;

        const coupon = {
            businessId,
            type,
            value: Number(value)
        }

        if(!businessId || !type || !value) {
            return;
        }

        await api.post('/coupons', coupon)
        .then(() => {
            history.push('/temp');
            history.goBack();
        }).catch(err => {
            console.log(err);
        });
    }

    async function handleBusinessSubmit(event: FormEvent) {
        event.preventDefault();

        const userId = Auth.auth.user.id;
        const { name, cnpj, uf, city } = businessFormData;
        const [ latitude, longitude ] = selectedPosition;

        if(!userId || !name || !cnpj || !uf || !city || !latitude || !longitude) {
            return;
        }

        const business = {
            userId,
            name,
            cnpj,
            uf,
            city,
            latitude,
            longitude
        }

        await api.post('/businesses', business)
        .then(() => {
            history.push('/temp');
            history.goBack();
        }).catch(err => {
            console.log(err);
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
                                <Form.Control defaultValue={''} as="select" name="type" onChange={handleCouponInputChange} value={couponFormData.type}>
                                    <option defaultValue={''} value="" disabled>Selecione...</option>
                                    <option key="PERCENTAGE" value="PERCENTAGE">Desconto em porcentagem</option>
                                    <option key="DISCOUNT" value="DISCOUNT">Desconto em dinheiro</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="number" name="value" placeholder="% ou R$" required onChange={handleCouponInputChange} value={couponFormData.value} />
                            </Form.Group>

                            <Button variant="warning" size="lg" block type="submit" onClick={handleCouponSubmit}>
                                Cadastrar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal centered show={createBusinessModalShow} onHide={handleCloseCreateBusinessModal}>
                    <Modal.Header>
                        <Modal.Title>Adicionar seu estabelecimento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Nome da sua empresa" required onChange={handleBusinessInputChange} value={businessFormData.name} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CNPJ da empresa</Form.Label>
                                <Form.Control type="number" name="cnpj" placeholder="Ex: 12.3456.789/1234-56" required onChange={handleBusinessInputChange} value={businessFormData.cnpj} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>UF</Form.Label>
                                <Form.Control defaultValue={''} as="select" name="uf" onChange={handleBusinessInputChange} value={businessFormData.uf}>
                                    <option defaultValue={''} value="" disabled>Selecione...</option>
                                    <option value="AC" key="AC">Acre</option>
                                    <option value="AL" key="AL">Alagoas</option>
                                    <option value="AP" key="AP">Amapá</option>
                                    <option value="AM" key="AM">Amazonas</option>
                                    <option value="BA" key="BA">Bahia</option>
                                    <option value="CE" key="CE">Ceará</option>
                                    <option value="DF" key="DF">Distrito Federal</option>
                                    <option value="ES" key="ES">Espírito Santo</option>
                                    <option value="GO" key="GO">Goiás</option>
                                    <option value="MA" key="MA">Maranhão</option>
                                    <option value="MT" key="MT">Mato Grosso</option>
                                    <option value="MS" key="MS">Mato Grosso do Sul</option>
                                    <option value="MG" key="MG">Minas Gerais</option>
                                    <option value="PA" key="PA">Pará</option>
                                    <option value="PB" key="PB">Paraíba</option>
                                    <option value="PR" key="PR">Paraná</option>
                                    <option value="PE" key="PE">Pernambuco</option>
                                    <option value="PI" key="PI">Piauí</option>
                                    <option value="RJ" key="RJ">Rio de Janeiro</option>
                                    <option value="RN" key="RN">Rio Grande do Norte</option>
                                    <option value="RS" key="RS">Rio Grande do Sul</option>
                                    <option value="RO" key="RO">Rondônia</option>
                                    <option value="RR" key="RR">Roraima</option>
                                    <option value="SC" key="SC">Santa Catarina</option>
                                    <option value="SP" key="SP">São Paulo</option>
                                    <option value="SE" key="SE">Sergipe</option>
                                    <option value="TO" key="TO">Tocantins</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" name="city" required onChange={handleBusinessInputChange} value={businessFormData.city} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Endereço</Form.Label>
                                <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={selectedPosition} />
                                </Map>
                            </Form.Group>

                            <Button variant="warning" size="lg" block type="submit" onClick={handleBusinessSubmit}>
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
        
                <div className="mt-2">
                    <Button variant="outline-light" className="float-right" onClick={handleOpenCreateBusinessModal}>Adicionar</Button>
                    <h1>Seus estabelecimentos</h1>
                </div>
                <div className="separator mb-3"></div>
                <div className="business-content mb-3">
                    <Row>
                        { businesses?.length !== 0 ?
                        
                            businesses?.map((business: Business) => (
                                <Col md="4" className="mb-5" key={business.id}>
                                    <Card style={{ width: '18rem' }} className="h-100">
                                        <Card.Img variant="top" src={businessPicture} />
                                        <Card.Body>
                                            <Card.Title>
                                                { business.name } 
                                            </Card.Title>
                                            <Card.Text as="div">
                                                <div>
                                                    <strong>Localização:</strong><br></br>
                                                    { `${business.city}/${business.uf}` }
                                                </div>
                                                <div>
                                                    <strong>Cupons:</strong><br></br>
                                                    <ul>
                                                    {   business.coupons.length !== 0 ?
                                                            business.coupons.map((coupon: Coupon) => (
                                                                <li key={coupon.id}>
                                                                    {
                                                                        coupon.type === 'DISCOUNT' ?
                                                                        `R$ ${coupon.value}` :
                                                                        `${coupon.value}% OFF`
                                                                    }
                                                                </li>
                                                            ))
                                                        :
                                                            <li>
                                                                Não há cupons cadastrados.
                                                            </li>
                                                    }
                                                    </ul>
                                                </div>
                                            </Card.Text>
                                            <Button variant="warning" className="mr-1" onClick={() => handleOpenCreateCouponModal(business)}>Adicionar novo cupom</Button>
                                            <Button variant="warning" onClick={() => handleOpenBusinessInfoModal(business)}>Ver</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        :
                            <Col className="text-white">
                                Não há empresas registradas em sua conta.
                            </Col>
                        }
                    </Row>
                </div>
            </Layout>
        </div>
    );
}

export default Businesses;