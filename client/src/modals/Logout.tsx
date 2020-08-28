import React, { useContext } from 'react';
import { ModalBody, ModalHeader, ModalFooter, Button, Modal } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Logout({ toggle }: any) {
    const history = useHistory();
    const { setUser } = useContext(CurrentUserContext);

    const logoutUser = () => {
        localStorage.removeItem('token');
        history.push('/');
        setUser(null);
        toggle();
    };

    return (
        <Modal isOpen={true} backdrop="static">
            <ModalHeader>Log out</ModalHeader>
            <ModalBody>Are you sure you want to log out?</ModalBody>
            <ModalFooter>
                <Button color="success" onClick={logoutUser} style={{ marginRight: '5px' }}>
                    Log out
                </Button>
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default Logout;
