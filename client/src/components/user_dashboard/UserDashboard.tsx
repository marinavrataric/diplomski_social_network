import React, { useState, useContext, useEffect } from 'react';
import avatar from '../../assets/avatar.png';
import Followers from '../followers/Followers';
import Following from '../following/Following';
import UpdatePhoto from '../../modals/UpdatePhoto';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllUsersContext } from '../../context/AllUsersContext';
import Axios from 'axios';
import { AllPostsContext } from '../../context/AllPostsContext';

function UserDashboard() {
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);

    const { currentUser } = useContext(CurrentUserContext);
    const { allUsers, setUsers } = useContext(AllUsersContext);
    const { setPosts } = useContext(AllPostsContext);

    const [userData] = allUsers.filter((user) => user._id === currentUser);

    useEffect(() => {
        Axios.get('/api/auth/users', {
            headers: {
                'x-auth-token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setUsers(res.data);
            })
            .then(() => {
                Axios.get('/api/posts/', {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    setPosts(res.data);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <React.Fragment>
            {userData && (
                <div className="user-info">
                    <div className="img-circular" onClick={() => setIsPhotoModalOpen(true)}>
                        <img
                            alt="avatar"
                            className="user-profile-img"
                            src={!userData.profile_image ? avatar : `http://localhost:5000/${userData.profile_image}`}
                        ></img>
                        <div className="middle">
                            <p className="update-photo">Update photo</p>
                        </div>
                    </div>
                    <p className="user-name">
                        {userData.first_name} {userData.last_name}
                    </p>
                    <p className="about-user">{userData.user_bio}</p>
                    <button className="btn-follow" onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                        <p className="follow-title">
                            {userData.followers.length}
                            {userData.followers.length > 1 || userData.followers.length === 0
                                ? ' followers'
                                : ' follower'}
                        </p>
                    </button>
                    <button className="btn-follow" onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                        <p className="follow-title">
                            {userData.following.length}
                            {userData.following.length > 1 || userData.following.length === 0
                                ? ' followings'
                                : ' following'}
                        </p>
                    </button>
                    {isFollowingOpen && userData.following.length && (
                        <Following
                            followingUsers={userData.following}
                            isFollowingOpen={isFollowingOpen}
                            setIsFollowingOpen={setIsFollowingOpen}
                        />
                    )}
                    {isFollowersOpen && userData.followers.length && (
                        <Followers
                            followersUsers={userData.followers}
                            isFollowersOpen={isFollowersOpen}
                            setIsFollowersOpen={setIsFollowersOpen}
                        />
                    )}
                    {isPhotoModalOpen && <UpdatePhoto setIsPhotoModalOpen={setIsPhotoModalOpen} />}
                </div>
            )}
        </React.Fragment>
    );
}

export default UserDashboard;
