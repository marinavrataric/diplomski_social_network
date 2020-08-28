import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';

import SinglePost from '../../components/single_post/SinglePost';
import { Input } from 'reactstrap';
import { AllPostsContext } from '../../context/AllPostsContext';

import './posts.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllUsersContext } from '../../context/AllUsersContext';

function AllPosts() {
    const { allPosts, setPosts, createPost } = useContext(AllPostsContext);
    const { allUsers } = useContext(AllUsersContext);
    const { currentUser } = useContext(CurrentUserContext);
    const [inputText, setInputText] = useState('');

    const [currentUserData] = allUsers.filter((user) => user._id === currentUser);

    useEffect(() => {
        Axios.get('/api/posts/', {
            headers: {
                'x-auth-token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const submitPost = async (e: any) => {
        e.preventDefault();
        createPost(inputText);

        setInputText('');
        e.target.reset();
    };

    return (
        <div className="center-post-div">
            <form onSubmit={submitPost}>
                <Input
                    type="text"
                    className="input-post-text"
                    onChange={(e: any) => setInputText(e.target.value)}
                    placeholder="What is on your mind?"
                />
            </form>

            {allPosts.length > 0 && (
                <div className="all-posts">
                    {allPosts
                        .filter(
                            (post) =>
                                post.isPublic ||
                                post.userID === currentUser ||
                                currentUserData.following.includes(post.userID),
                        )
                        .map((post) => {
                            const startDate = moment(post.postDate);
                            const dateNow = new Date();
                            const timeEnd = moment(dateNow);
                            const diff = timeEnd.diff(startDate);
                            const diffDuration = moment.duration(diff);
                            return <SinglePost post={post} diffDuration={diffDuration} key={post._id} />;
                        })}
                </div>
            )}
        </div>
    );
}

export default AllPosts;
