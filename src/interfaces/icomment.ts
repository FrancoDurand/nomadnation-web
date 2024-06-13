import IUser from "./iuser";

interface IComment {
    _id?: string;
    author: Pick<IUser, "_id" | "name" | "profilePic">;
    comment: string;
}

export default IComment;