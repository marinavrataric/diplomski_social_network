import React, { useState, useContext } from 'react';
import './singlePost.css';
import { Input } from 'reactstrap';
import PostTime from './post-creation-time/PostTime';
import FirstThreeComments from '../comments/FirstThreeComments';
import AllComments from '../comments/AllComments';
import DropdownPostOptions from '../dropdown/DropdownPostOptions';
import UserInfoComment from '../user_info_comment/UserInfoComment';
import CommentsButtons from '../comment_buttons/CommentsButtons';
import { PostInterface } from '../../interfaces/PostInterface';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllPostsContext } from '../../context/AllPostsContext';

interface SinglePostProps {
    post: PostInterface;
    diffDuration: moment.Duration;
}

function SinglePost({ post, diffDuration }: SinglePostProps) {
    const { currentUser } = useContext(CurrentUserContext);
    const { deletePost, createComment } = useContext(AllPostsContext);
    const [isShown, setIsShown] = useState(false);

    const showComments = () => setIsShown((prev) => !prev);

    return (
        <div className="all-posts">
            <div className="single-post-container">
                <div className="row-info">
                    <div className="left-align-user">
                        <UserInfoComment post={post} PostTime={PostTime} diffDuration={diffDuration} />
                    </div>
                    <div className="right-align-user">
                        <div className="option-left">
                            {post.userID === currentUser && <DropdownPostOptions post={post} />}
                        </div>
                        <div className="option-right">
                            {post.userID === currentUser && (
                                <button className="btn btn-delete" onClick={() => deletePost(post._id)}>
                                    <i className="fa fa-remove" style={{ color: 'red', fontSize: '20px' }}></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row-content">
                    <div className="user-post-text-container">
                        <h2 className="user-post-text">{post.content}</h2>
                    </div>
                    <hr />
                </div>
                <CommentsButtons post={post} showComments={showComments} />
                <hr />
                <div className="comments-container">
                    {isShown ? AllComments(post.comments, post._id) : FirstThreeComments(post.comments, post._id)}
                </div>
                <form
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        createComment(e.target[0].value, post._id);
                        e.target[0].value = '';
                    }}
                >
                    <Input className="text-comment-input" placeholder="Add comment"></Input>
                </form>
            </div>
        </div>
    );
}

export default SinglePost;
