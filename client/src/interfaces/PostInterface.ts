export interface CommentInterface {
    _id: string;
    text: string;
    userID: string;
}

export interface PostInterface {
    _id: string;
    content: string;
    postDate: string;
    userID: string;
    isPublic: boolean;
    likes: string[];
    comments: CommentInterface[];
}
