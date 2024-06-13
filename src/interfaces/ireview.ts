import IMedia from "./imedia";
import IComment from "./icomment";
import IUser from "./iuser";

interface IReview {
    _id?: string;
    offer: string;
    author: Pick<IUser, "_id" | "name" | "profilePic">;
    title: string;
    media: IMedia[];
    post: string;
    comments: IComment[];
}

export default IReview;