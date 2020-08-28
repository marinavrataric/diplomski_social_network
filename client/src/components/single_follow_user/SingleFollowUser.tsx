import React, { useContext } from 'react';
import avatar from '../../assets/avatar.png';
import { AllUsersContext } from '../../context/AllUsersContext';

function SingleFollowUser({ following }: any) {
    const { allUsers } = useContext(AllUsersContext);
    const [userArray] = allUsers.filter((user) => user._id === following);

    return (
        <div>
            <div className="follower-user-container">
                <div className="img-comment-circular-mini">
                    <img
                        alt="avatar"
                        className="user-photo-mini"
                        src={!userArray.profile_image ? avatar : `http://localhost:5000/${userArray.profile_image}`}
                    ></img>
                </div>
                <h5 className="follow-user-name">
                    {userArray.first_name} {userArray.last_name}
                </h5>
            </div>
        </div>
    );
}

export default SingleFollowUser;
