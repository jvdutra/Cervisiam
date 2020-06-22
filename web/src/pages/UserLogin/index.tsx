import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import api from '../../services/api';
import util from '../../services/util';

import  './styles.css';

const UserLogin = () => {
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
        .then((res) => {
            handleCloseLoadingModal();

            if(!res.data.success) {
                return handleOpenModal('Erro ao efetuar o login!', util.getMessageByCode(res.data.message));
            }

            handleOpenModal('Logado com sucesso!', 'Redirecionando...');

            setTimeout(() => {
                handleCloseModal();
                history.push('/dashboard');
            }, 2000);
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