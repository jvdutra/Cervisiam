import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import api from '../../services/api';

import  './styles.css';

const UserRegistration = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        dob: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, password, cpf, dob } = formData;

        const user = {
            name,
            email,
            password,
            cpf,
            dob
        }

        console.log(user);

        await api.post('/users', user);
        alert('Cadastrado com sucesso!');
        history.push('/');
    }

    return (
        <>
            <Layout>
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
                            <Form.Control type="date" name="dob" placeholder="01/01/1990" required onChange={handleInputChange} value={formData.dob} />
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