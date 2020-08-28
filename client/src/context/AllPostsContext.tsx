import React, { useState, createContext } from 'react';
import Axios from 'axios';

import { PostInterface } from '../interfaces/PostInterface';

interface AllPostProps {
    allPosts: PostInterface[];
    setPosts: (posts: PostInterface[]) => void;
    likePost: (postID: string) => void;
    unLikePost: (postID: string) => void;
    createPost: (text: string) => void;
    deletePost: (postID: string) => void;
    createComment: (text: string, postID: string) => void;
    deleteComment: (postID: string, commentID: string) => void;
    togglePostVisibility: (postID: string, isPublic: boolean) => void;
}

export const AllPostsContext = createContext<AllPostProps>({
    allPosts: [],
    setPosts: () => null,
    likePost: () => null,
    unLikePost: () => null,
    createPost: () => null,
    deletePost: () => null,
    createComment: () => null,
    deleteComment: () => null,
    togglePostVisibility: () => null,
});

export const AllPostsContextProvider: React.FC = ({ children }) => {
    const [allPosts, setAllPosts] = useState<PostInterface[]>([]);

    const config = {
        headers: {
            'x-auth-token': window.localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    };

    const likePost = (postID: string) => {
        Axios.put('/api/posts/like', { postID }, config).then(() =>
            Axios.get('/api/posts/', config).then((res) => {
                setPosts(res.data);
            }),
        );
    };

    const unLikePost = (postID: string) => {
        Axios.put('/api/posts/unlike', { postID }, config)
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            )
            .catch((err) => console.log(err));
    };

    const setPosts = (posts: PostInterface[]) => setAllPosts(posts);

    const createPost = (text: string) => {
        Axios.post('/api/posts', { content: text }, config)
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            )
            .catch((err) => console.log(err));
    };

    const deletePost = (postID: string) => {
        Axios.delete(`/api/posts/${postID}`, config)
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            )
            .catch((err) => console.log(err));
    };

    const createComment = (text: string, postID: string) => {
        Axios.put('/api/posts/comment', { postID, text }, config)
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            )
            .catch((err) => console.log(err));
    };

    const deleteComment = (postID: string, commentID: string) => {
        Axios.delete(`/api/posts/comment/${postID}/${commentID}`, config)
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            )
            .catch((err) => console.log(err));
    };

    const togglePostVisibility = (postID: string, isPublic: boolean) => {
        Axios.put(`/api/posts/createPost/${postID}`, { postID, isPublic }, config)
            .catch((err) => console.log(err))
            .then(() =>
                Axios.get('/api/posts/', config).then((res) => {
                    setPosts(res.data);
                }),
            );
    };

    return (
        <AllPostsContext.Provider
            value={{
                allPosts,
                setPosts,
                likePost,
                unLikePost,
                createPost,
                deletePost,
                createComment,
                deleteComment,
                togglePostVisibility,
            }}
        >
            {children}
        </AllPostsContext.Provider>
    );
};
