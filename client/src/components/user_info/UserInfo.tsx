import React from 'react';
import avatar from '../../assets/avatar.png';

import { UserInterface } from '../../interfaces/UserInterface';

type Props = { userProfile: UserInterface };

const UserInfo = ({ userProfile }: Props) => {
    return (
        <div className="user-info">
            <div className="img-circular">
                <img
                    alt="avatar"
                    className="user-profile-img2"
                    src={userProfile.profile_image ? `http://localhost:5000/${userProfile.profile_image}` : avatar}
                ></img>
            </div>
            <p className="user-name">
                {userProfile.first_name} {userProfile.last_name}
            </p>
            <p className="about-user">{userProfile.user_bio}</p>
        </div>
    );
};

export default UserInfo;
