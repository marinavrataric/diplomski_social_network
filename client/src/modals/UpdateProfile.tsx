import React, { useState, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';
import { configWithoutToken } from '../constants/generalConstants';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { AllUsersContext } from '../context/AllUsersContext';

function UpdateProfile(props: any) {

    const { currentUser } = useContext(CurrentUserContext)
    const { allUsers, setUsers } = useContext(AllUsersContext)

    const [userData] = allUsers.filter((user) => user._id === currentUser);

    const [firstNameUpdated, setFirstNameUpdated] = useState(userData.first_name);
    const [lastNameUpdated, setLastNameUpdated] = useState(userData.last_name);
    const [userBioUpdated, setUserBioUpdated] = useState(userData.user_bio);

    const updateUser = (e: any) => {
        e.preventDefault();

        const body = {
            first_name: firstNameUpdated,
            last_name: lastNameUpdated,
            user_bio: userBioUpdated,
        };

        Axios.put(`/api/users/${currentUser}`, body, configWithoutToken)
            .then(() => {
                Axios.get('/api/auth/users', {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => {
                        setUsers(res.data);
                        props.setIsEditOpen(false)
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <Modal isOpen={true} toggle={() => props.setIsEditOpen(false)} backdrop="static">
            <ModalHeader>Update your profile</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        onChange={(e: any) => setFirstNameUpdated(e.target.value)}
                        defaultValue={firstNameUpdated}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        onChange={(e: any) => setLastNameUpdated(e.target.value)}
                        defaultValue={lastNameUpdated}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>About me</Label>
                    <Input
                        type="text"
                        onChange={(e: any) => setUserBioUpdated(e.target.value)}
                        defaultValue={userBioUpdated}
                    ></Input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={updateUser} className="btn-update">
                    Update
                        </Button>
                <Button color="danger" onClick={() => props.setIsEditOpen(false)}>
                    Cancel
                        </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UpdateProfile;
