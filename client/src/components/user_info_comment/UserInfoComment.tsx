import React, { useContext } from 'react';
import avatar from '../../assets/avatar.png';
import { AllUsersContext } from '../../context/AllUsersContext';

function UserInfoComment({ post, PostTime, diffDuration }: any) {
    const { allUsers } = useContext(AllUsersContext);

    const [userArray] = allUsers.filter((el) => el._id === post.userID);

    return (
        <>
            {userArray && (
                <div className="user-name-photo">
                    <div className="img-circular-mini">
                        <img
                            className="user-photo-mini"
                            src={!userArray.profile_image ? avatar : `http://localhost:5000/${userArray.profile_image}`}
                            alt="user profile img"
                        ></img>
                    </div>

                    <div className="right-user-name-post">
                        {post.userID && (
                            <p className="user-name-post">
                                {userArray.first_name} {userArray.last_name}
                            </p>
                        )}
                        {PostTime(diffDuration.days(), diffDuration.hours(), diffDuration.minutes())}
                    </div>
                </div>
            )}
        </>
    );
}

export default UserInfoComment;
