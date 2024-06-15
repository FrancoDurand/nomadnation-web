import { Avatar, Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { useState } from "react"
import IComment from "../../interfaces/icomment"
import IReviewPost from "../../interfaces/ireviewpost"
import "./Comment.css"
import { ReviewService } from "../../services/review-service"

const inputButtonStyles = {
    cursor: "pointer",
    borderColor: "#a7a8a9",
    color: "#757575",
    bg: "f3f4f6",
    _hover: {
        borderColor: "#CBD5E0"
    }
}


export function Comment({ reviewId, commentsData }: { reviewId: string, commentsData: IComment[] }) {
    const [comments, setComments] = useState<IComment[]>(commentsData);
    const [comment, setComment] = useState("");

    const handleClick = async () => {
        const newComment: IReviewPost = {
            _id: reviewId,
            comments: [
                {
                    author: sessionStorage.getItem('userId') as string,
                    comment: comment
                }
            ]
        }

        await ReviewService.comment(newComment);

        const newCommentData: IComment = {
            author: {
                _id: sessionStorage.getItem('userId') as string,
                name: sessionStorage.getItem('userName') as string,
                profilePic: sessionStorage.getItem('userProfilePic') as string,
            },
            comment: comment
        }

        setComments([...comments, newCommentData]);
        setComment("")
    }

    return (
        <div className="comment-section">
            <h3 className="comment-section__title">Comentarios</h3>
            {
                comments.map(comment =>
                    <div key={comment._id} className="comment">
                        <Avatar src={comment.author.profilePic as string} />
                        <div className="comment__info">
                            <h3 className="comment__author-name">{comment.author.name}</h3>
                            <p className="comment__text">{comment.comment}</p>
                        </div>
                    </div>
                )
            }
            <InputGroup>
                <Input onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Agrega un comentario' borderColor="#a7a8a9" />
                <InputRightAddon  {...inputButtonStyles} onClick={() => handleClick()}>
                    Publicar
                </InputRightAddon>
            </InputGroup>
        </div>
    )
}
