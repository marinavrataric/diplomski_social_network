import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import Axios from 'axios';
import { configWithoutToken } from '../constants/generalConstants';
import SingleFormGroup from '../components/form_group/SingleFormGroup';

function Register({ toggle }: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const validateSignUp = (e: any) => {
        e.preventDefault();
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };
        Axios.post('/api/users', user, configWithoutToken)
            .then((res) => {
                window.alert('User successfully created! Proceed to login.');
            })
            .catch((err) => {
                setErrorMsg(err.response.data.msg);
                localStorage.removeItem('token');
            });
    };

    return (
        <Modal isOpen={true} toggle={toggle} backdrop="static">
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}
            <ModalHeader>Sign Up</ModalHeader>
            <ModalBody>
                <SingleFormGroup labelName="First Name" setValue={setFirstName} type={'text'} />
                <SingleFormGroup labelName="Last Name" setValue={setLastName} type={'text'} />
                <SingleFormGroup labelName="Email" setValue={setEmail} type={'email'} />
                <SingleFormGroup labelName="Password" setValue={setPassword} type={'password'} />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={validateSignUp}
                    disabled={!firstName || !lastName || !email || !password}
                    style={{ marginRight: '5px' }}
                >
                    Sign Up
                </Button>
                <Button color="danger" onClick={() => toggle(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default Register;
