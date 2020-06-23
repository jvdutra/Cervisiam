import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import Layout from '../../components/Layout';
import api from '../../services/api';
import util from '../../services/util';
import AuthApi from '../../services/auth';

import  './styles.css';

const UserLogin = () => {
    const Auth = React.useContext(AuthApi);
    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);

    const [modal, setModal] = useState({
        title: '',
        message: ''
    });

    const [loadingModal, setLoadingModal] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleOpenModal(title: string, message: string) {
        setModal({
            title,
            message
        });

        return setModalShow(true);
    }

    function handleCloseModal() {
        setModal({
            title: '',
            message: ''
        });

        return setModalShow(false);
    }

    function handleOpenLoadingModal() {
        return setLoadingModal(true);
    }

    function handleCloseLoadingModal() {
        return setLoadingModal(false);
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        const { email, password } = formData;

        const user = {
            email,
            password
        }

        handleOpenLoadingModal();

        await api.post('/login', user)
        .then(async (res) => {
            if(!res.data.success) {
                handleCloseLoadingModal();
                return handleOpenModal('Erro ao efetuar o login!', util.getMessageByCode(res.data.message));
            }

            const userId = res.data.userId;

            await api.get(`/users/${userId}`)
            .then(async (res) => {
                const user = res.data;

                handleCloseLoadingModal();

                handleOpenModal('Logado com sucesso!', 'Redirecionando...');
    
                Auth.setAuth({
                    logged: true,
                    user: {
                        id: user.id
                    }
                });

                Cookies.set('USER_ID', user.id);
                Cookies.set('SESSION', 'c3ccb814226d1aea174b6a68c1a98b45');
    
                setTimeout(() => {
                    handleCloseModal();
                    history.push('/dashboard');
                }, 2000);
            });
        }).catch(err => {
            handleCloseLoadingModal();

            handleOpenModal('Erro ao efetuar o login!', 'Um erro desconhecido aconteceu ao efetuar seu login. Por favor, tente novamente.');
        });
    }

    return (
        <>
            <Layout>
                <Modal size="sm" centered show={loadingModal} onHide={handleCloseLoadingModal}>
                    <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner animation="border" variant="warning" />
                    </Modal.Body>
                </Modal>
                <Modal centered show={modalShow} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>{modal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modal.message}</Modal.Body>
                </Modal>

                <div className="content mt-3 mb-3">
                    <h1>Login</h1>
                    <p>Entre para ver seus descontos</p>
                    <hr/>
                    <Form style={{ maxWidth: 350 }}>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Digite seu melhor e-mail" required onChange={handleInputChange} value={formData.email} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Digite uma senha" required onChange={handleInputChange} value={formData.password} />
                        </Form.Group>

                        <Button variant="outline-light" size="lg" block type="submit" onClick={handleFormSubmit}>
                            Login
                        </Button>
                    </Form>
                </div>
            </Layout>
        </>
    );
}

export default UserLogin;