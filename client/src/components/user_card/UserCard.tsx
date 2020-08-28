import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllUsersContext } from '../../context/AllUsersContext';
import { UserInterface } from '../../interfaces/UserInterface';

interface UseCardProps {
    user: UserInterface;
}
function UserCard({ user }: UseCardProps) {
    const { currentUser } = useContext(CurrentUserContext);
    const { followUser, unFollowUser } = useContext(AllUsersContext);

    return (
        <div className="user-container" key={user._id}>
            <div className="user-card">
                <div className="left">
                    <div className="circular">
                        <img alt="avatar" src={user.profile_image === '' ? avatar : user.profile_image}></img>
                    </div>
                </div>
                <div className="right">
                    <p className="user-info2">
                        {user.first_name} {user.last_name}
                    </p>
                    {currentUser && user.followers.includes(currentUser) ? (
                        <Button color="info" className="btn-find" onClick={() => unFollowUser(user._id)}>
                            Unfollow
                        </Button>
                    ) : (
                        <Button color="info" className="btn-find" onClick={() => followUser(user._id)}>
                            Follow
                        </Button>
                    )}{' '}
                    <Button color="info" className="btn-find">
                        <Link
                            to={{
                                pathname: `/userProfile/${user._id}`,
                                state: user,
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <p className="btn-name">View Profile</p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
