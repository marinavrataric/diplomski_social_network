import React , {useContext} from 'react';
import { CommentInterface } from '../../interfaces/PostInterface';
import SingleComment from './SingleComment';
import { AllPostsContext } from '../../context/AllPostsContext';

function AllComments(comments: CommentInterface[], postID:string) {
    const {allPosts} = useContext(AllPostsContext);

    const postArray = allPosts.filter((post) => post._id === postID);
    const [commentArray] = postArray.map(post => post.comments);

     console.log(commentArray)
    return comments.map((comment) => <SingleComment comment={comment} postID={postID} key={comment._id} />);
}

export default AllComments;
