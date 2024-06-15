import ICommentPost from "./icommentpost";

interface IReviewPost {
    _id?: string
    comments: ICommentPost[];
}

export default IReviewPost;