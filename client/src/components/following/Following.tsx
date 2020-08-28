import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SingleFollowUser from '../single_follow_user/SingleFollowUser';

function Following({ followingUsers, isFollowingOpen, setIsFollowingOpen }: any) {
    const followingUserList = followingUsers.map((following: any) => (
        <SingleFollowUser following={following} key={following} />
    ));

    return (
        <div className="following-user-list">
            <Modal isOpen={true} toggle={() => setIsFollowingOpen(!isFollowingOpen)}>
                <ModalHeader>Following users</ModalHeader>
                <ModalBody>{followingUserList}</ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => setIsFollowingOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Following;
