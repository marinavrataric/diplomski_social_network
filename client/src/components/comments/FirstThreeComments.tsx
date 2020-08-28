import React from 'react';
import { CommentInterface } from '../../interfaces/PostInterface';
import SingleComment from './SingleComment';

function FirstThreeComments(comments: CommentInterface[], postID: string) {
    const numberOfCommentsToDisplay = 3;

    return comments
        .slice(0, numberOfCommentsToDisplay)
        .map((comment) => <SingleComment comment={comment} postID={postID} key={comment._id} />);
}

export default FirstThreeComments;
