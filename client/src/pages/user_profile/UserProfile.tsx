import React, { useContext, useState, useEffect } from 'react';
import './profile.css';
import { useRouteMatch } from 'react-router-dom';
import SinglePost from '../../components/single_post/SinglePost';
import { Button } from 'reactstrap';
import Following from '../../components/following/Following';
import Followers from '../../components/followers/Followers';
import moment from 'moment';
import UserInfo from '../../components/user_info/UserInfo';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllUsersContext } from '../../context/AllUsersContext';
import { AllPostsContext } from '../../context/AllPostsContext';
import Axios from 'axios';

const UserProfile = () => {
    const match = useRouteMatch<{ id: string }>();

    const { currentUser } = useContext(CurrentUserContext);
    const { allPosts, setPosts } = useContext(AllPostsContext);
    const { followUser, unFollowUser, allUsers } = useContext(AllUsersContext);

    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);

    const dateNow = new Date();

    const [userData] = allUsers.filter((user) => user._id === match.params.id);
    const userPosts = allPosts.filter((post) => post.userID === match.params.id);

    useEffect(() => {
        Axios.get('/api/posts/', {
            headers: {
                'x-auth-token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <React.Fragment>
            {userData && (
                <div className="profile-container">
                    <UserInfo userProfile={userData} />
                    <div className="user-posts">
                        <button
                            className="btn-follow btn-follow-marg"
                            onClick={() => setIsFollowersOpen(!isFollowersOpen)}
                        >
                            <p className="follow-title">
                                {userData.followers.length}
                                {userData.followers && userData.followers.length < 2 ? ' follower' : ' followers'}
                            </p>
                        </button>
                        <button
                            className="btn-follow btn-follow-marg"
                            onClick={() => setIsFollowingOpen(!isFollowingOpen)}
                        >
                            <p className="follow-title">{userData.following.length} following</p>
                        </button>
                        <hr className="hr" />
                        {userPosts && userPosts.length === 0 ? (
                            <h3>No posts yet</h3>
                        ) : (
                            userPosts &&
                            userPosts.map((post) => {
                                const startDate = moment(post.postDate);
                                const timeEnd = moment(dateNow);
                                const diff = timeEnd.diff(startDate);
                                const diffDuration = moment.duration(diff);
                                return <SinglePost post={post} diffDuration={diffDuration} key={post._id} />;
                            })
                        )}
                    </div>
                    {isFollowingOpen && userData.following.length > 0 && (
                        <Following
                            followingUsers={userData.following}
                            isFollowingOpen={isFollowingOpen}
                            setIsFollowingOpen={setIsFollowingOpen}
                        />
                    )}
                    {isFollowersOpen && userData.followers.length > 0 && (
                        <Followers
                            followersUsers={userData.followers}
                            isFollowersOpen={isFollowersOpen}
                            setIsFollowersOpen={setIsFollowersOpen}
                        />
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export default UserProfile;
