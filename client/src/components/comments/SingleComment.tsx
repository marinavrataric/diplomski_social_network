import React, { useContext } from 'react';
import avatar from '../..//assets/avatar.png';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { CommentInterface } from '../../interfaces/PostInterface';
import { AllUsersContext } from '../../context/AllUsersContext';
import { AllPostsContext } from '../../context/AllPostsContext';

type Props = { comment: CommentInterface, postID: string};

function SingleComment({ comment, postID }: Props) {
    const { currentUser } = useContext(CurrentUserContext);
    const { deleteComment, allPosts } = useContext(AllPostsContext);
    const { allUsers } = useContext(AllUsersContext);

    const [userArray] = allUsers.filter((user) => user._id === comment.userID);

    return (
        <div className="comment-container">
            <div className="img-comment-circular-mini">
                <img
                    alt="avatar"
                    src={!userArray.profile_image ? avatar : `http://localhost:5000/${userArray.profile_image}`}
                    className="user-photo-mini"
                ></img>
            </div>
            <div className="comment-text-container">
                <p className="text-bold">
                    {userArray.first_name} {userArray.last_name}
                </p>
                <p className="comment">{comment.text}</p>
                <div className="div-comment-delete">
                    {comment.userID === currentUser && (
                        <button className="bt" onClick={() => deleteComment(postID, comment._id)}>
                            <i className="fa fa-remove" style={{ fontSize: '14px', color: 'red' }}></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleComment;
