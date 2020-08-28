import React, { useState, useEffect, useContext } from 'react';
import './profile.css';
import Axios from 'axios';
import SinglePost from '../../components/single_post/SinglePost';
import UpdateProfile from '../../modals/UpdateProfile';
import '../../components/followers/follow.css';
import { Input } from 'reactstrap';
import moment from 'moment';
import UserDashboard from '../../components/user_dashboard/UserDashboard';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllPostsContext } from '../../context/AllPostsContext';
import { PostInterface } from '../../interfaces/PostInterface';
import { AllUsersContext } from '../../context/AllUsersContext';

function MyProfile() {
    const { allPosts, createPost } = useContext(AllPostsContext);
    const { setUsers } = useContext(AllUsersContext);

    const { currentUser } = useContext(CurrentUserContext);

    const userPosts = allPosts.filter((post) => post.userID === currentUser);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const dateNow = new Date();

    const submitPost = (e: any) => {
        e.preventDefault();
        createPost(inputText);
        e.target[0].value = '';
    };

    useEffect(() => {
        window.localStorage.getItem('token') &&
            Axios.get('/api/auth/users', {
                headers: {
                    'x-auth-token': window.localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => console.log(err));
    }, []);

    return (
        <div className="profile-container">
            <button className="btn-edit" onClick={() => setIsEditOpen(true)}>
                <i className="fa fa-edit"></i>
            </button>
            <UserDashboard />
            <hr />
            <form onSubmit={submitPost}>
                <Input
                    type="text"
                    className="input-post-text input-profile-text"
                    onChange={(e: any) => setInputText(e.target.value)}
                    placeholder="What is on your mind?"
                />
            </form>
            {userPosts.length === 0 ? (
                <h3>No posts yet</h3>
            ) : (
                userPosts.map((post: PostInterface) => {
                    const startDate = moment(post.postDate);
                    const timeEnd = moment(dateNow);
                    const diff = timeEnd.diff(startDate);
                    const diffDuration = moment.duration(diff);
                    return <SinglePost post={post} diffDuration={diffDuration} key={post._id} />;
                })
            )}
            {isEditOpen && <UpdateProfile setIsEditOpen={setIsEditOpen} />}
        </div>
    );
}

export default MyProfile;
