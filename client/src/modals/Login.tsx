import React, { useState, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import Axios from 'axios';
import { configWithoutToken } from '../constants/generalConstants';
import SingleFormGroup from '../components/form_group/SingleFormGroup';
import { useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../context/CurrentUserContext';

function Login({ toggle }: any) {
    const { setUser } = useContext(CurrentUserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const history = useHistory();

    const loginUser = (e: any) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };

        Axios.post('/api/auth', user, configWithoutToken)
            .then((res) => {
                window.localStorage.setItem('token', res.data.token);
                setUser(res.data.user.id);
                setTimeout(() => history.push('/myProfile'), 500);
            })
            .catch((err) => {
                setErrorMsg(err.response.data.msg);
            });
    };

    return (
        <Modal isOpen={true} backdrop="static">
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
                <SingleFormGroup labelName="Email" setValue={setEmail} type={'email'} />
                <SingleFormGroup labelName="Password" setValue={setPassword} type={'password'} />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={loginUser}
                    disabled={!email || !password}
                    style={{ marginRight: '5px' }}
                >
                    Sign In
                </Button>
                <Button color="danger" onClick={() => toggle()}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default Login;
