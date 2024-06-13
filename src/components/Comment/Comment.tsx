import { Avatar } from "@chakra-ui/react"
import IComment from "../../interfaces/icomment"
import "./Comment.css"

export function Comment({ commentsData }: { commentsData: IComment[] }) {
    return (
        <div className="comment-section">
            <h3 className="comment-section__title">Comentarios</h3>
            {
                commentsData.map(comment =>
                    <div key={comment._id} className="comment">
                        <Avatar src={comment.author.profilePic as string} />
                        <div className="comment__info">
                            <h3 className="comment__author-name">{comment.author.name}</h3>
                            <p className="comment__text">{comment.comment}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
