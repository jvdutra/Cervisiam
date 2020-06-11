import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import api from '../../services/api';

import  './styles.css';

const UserRegistration = () => {
    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);

    const [modal, setModal] = useState({
        title: '',
        message: ''
    });

    const [loadingModal, setLoadingModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        dateOfBirth: ''
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

        const { name, email, password, cpf, dateOfBirth } = formData;

        const user = {
            name,
            email,
            password,
            cpf,
            dateOfBirth
        }

        handleOpenLoadingModal();

        await api.post('/users', user)
        .then(() => {
            handleCloseLoadingModal();

            handleOpenModal('Cadastrado com sucesso!', 'Agora entre em sua conta utilizando seu e-mail e senha.');

            setTimeout(() => {
                handleCloseModal();
                history.push('/login');
            }, 2000);
        }).catch(err => {
            handleCloseLoadingModal();

            handleOpenModal('Erro ao cadastrar!', 'Um erro aconteceu ao efetuar seu cadastro. Por favor, tente novamente.');
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
                    <h1>Registro</h1>
                    <p>Crie sua conta para ganhar descontos exclusivos!</p>
                    <hr/>
                    <Form style={{ maxWidth: 350 }}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Digite seu nome" required onChange={handleInputChange} value={formData.name} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Digite seu melhor e-mail" required onChange={handleInputChange} value={formData.email} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Digite uma senha" required onChange={handleInputChange} value={formData.password} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="number" name="cpf" maxLength={11} placeholder="12345678910" required onChange={handleInputChange} value={formData.cpf} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="01/01/1990" required onChange={handleInputChange} value={formData.dateOfBirth} />
                        </Form.Group>

                        <Button variant="outline-light" size="lg" block type="submit" onClick={handleFormSubmit}>
                            Registro
                        </Button>
                    </Form>
                </div>
            </Layout>
        </>
    );
}

export default UserRegistration;