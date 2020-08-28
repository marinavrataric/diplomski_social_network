import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Modal, FormGroup, Input, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { AllUsersContext } from '../context/AllUsersContext';

function UpdatePhoto(props: any) {
    const { currentUser } = useContext(CurrentUserContext);
    const { allUsers, setUsers } = useContext(AllUsersContext);

    const [userData] = allUsers.filter((user) => user._id === currentUser);
    const [file, setFile] = useState(userData.profile_image);
    const [uploaded, setUploaded] = useState(userData.profile_image);

    // upload image
    const handleImageUpload = (e: any) => {
        e.preventDefault();
        if (e.target && e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append('fileImage', file);

        Axios.post('/api/image', formData, {})
            .then((res) => {
                setUploaded(`http://localhost:5000/${res.data.fileImage}`);
            })
            .catch((err) => console.log(err));
    };

    // update photo
    const updatePhoto = () => {
        const formData = new FormData();
        formData.append('fileImage', file);

        const config: any = { header: { 'Content-Type': 'multipart/form-data' } };
        Axios.put(`/api/users/${currentUser}/photo`, formData, config).then(() => {
            Axios.get('/api/auth/users', {
                headers: {
                    'x-auth-token': window.localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    setUsers(res.data);
                    props.setIsPhotoModalOpen(false);
                })
                .catch((err) => console.log(err));
        });
    };

    return (
        <Modal isOpen={true} toggle={() => props.setIsPhotoModalOpen(false)} backdrop="static">
            <ModalHeader>Update Photo</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Input type="file" name="fileImage" onChange={handleImageUpload}></Input>
                </FormGroup>
                <Button onClick={uploadPhoto} className="btn-upload-img">
                    Upload file
                </Button>
                <div className="inline">
                    <img alt="avatar" src={uploaded} style={{ width: '100px' }}></img>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" className="btn-update-photo-success" onClick={updatePhoto}>
                    Update
                </Button>
                <Button
                    color="danger"
                    onClick={() => props.setIsPhotoModalOpen(false)}
                    className="btn-update-photo-cancel"
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UpdatePhoto;
