import React, { useContext } from 'react';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import { PostInterface } from '../../interfaces/PostInterface';
import { AllPostsContext } from '../../context/AllPostsContext';

type Props = {
    post: PostInterface;
    showComments: () => void;
};

const CommentsButtons: React.FC<Props> = ({ post, showComments }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const { likePost, unLikePost } = useContext(AllPostsContext);

    return (
        <div className="buttons">
            <p className="number-of-likes">
                {post.likes.length}
                {post.likes.length === 0 ? ' likes' : post.likes.length > 1 ? ' likes' : ' like'}
            </p>
            {currentUser && post.likes.includes(currentUser) ? (
                <button className="btn btn-like" onClick={() => unLikePost(post._id)}>
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </button>
            ) : (
                <button className="btn btn-like" onClick={() => likePost(post._id)}>
                    <i className="fa fa-thumbs-up" style={{ color: 'gray' }} aria-hidden="true"></i>
                </button>
            )}
            <button onClick={() => showComments()} className="btn-comment">
                {post.comments.length}
                {post.comments.length === 0 ? ' comments' : post.comments.length > 1 ? ' comments' : ' comment'}
            </button>
        </div>
    );
};

export default CommentsButtons;
