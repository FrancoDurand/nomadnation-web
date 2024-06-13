import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import IReview from "../../interfaces/ireview";
import { ReviewService } from "../../services/review-service";
import { Avatar } from "@chakra-ui/react";
import "./Review.css"
import { Comment } from "../Comment/Comment";

export function Review() {
    const { id } = useParams();
    const [reviewData, setReviewData] = useState<IReview[]>();
    useEffect(() => {
        const fetchOffer = async () => {
            if (id) {
                const data = await ReviewService.getByOffer(id);
                setReviewData(data);
            }
        };

        fetchOffer();
    }, []);


    return (
        <div className="review">
            <h2 className="review__title">Reseñas</h2>
            {
                reviewData?.map(review =>
                    <div className="review__card">
                        <div className="review__card-author">
                            <Avatar src={review.author.profilePic as string} />
                            <h3 className="review__author">{review.author.name}</h3>
                        </div>
                        <p className="review__post">{review.post}</p>
                        <Comment commentsData={review.comments} />
                        {/* {
                            review.media.map(img =>
                                <img src={img.route}></img>
                            )
                        } */}
                    </div>
                )
            }
        </div>
    )
}