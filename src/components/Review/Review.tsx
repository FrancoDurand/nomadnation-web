import { Avatar } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReviewContext } from "../../contexts/ReviewContext/ReviewContext";
import IReview from "../../interfaces/ireview";
import { ReviewService } from "../../services/review-service";
import { EmblaCarousel } from "../Carousel/Carousel";
import { Comment } from "../Comment/Comment";
import { ModalReview } from "../ModalReview/ModalReview";
import "./Review.css";

const options = {
    loop: true
}

export function Review() {
    const { id } = useParams();
    const { reviews, setReviews } = useContext(ReviewContext);

    useEffect(() => {
        const fetchOffer = async () => {
            if (id) {
                const data = await ReviewService.getByOffer(id);
                console.log(data);
                setReviews(data as IReview[]);
            }
        };

        fetchOffer();
    }, [reviews]);

    return (
        <div className="review">
            <div className="review__header">
                <h2>Reseñas</h2>
                <ModalReview />
            </div>
            {
                reviews?.map(review =>
                    <div className="review__card">
                        <div className="review__card-author">
                            <Avatar src={review.author.profilePic as string} />
                            <h3 className="review__author">{review.author.name}</h3>
                        </div>
                        <h3 className="review__title">{review.title}</h3>
                        <p className="review__post">{review.post}</p>
                        <div className="review__card-image">
                            <EmblaCarousel
                                images={review.media.map(img => img.route)}
                                options={options}
                            />
                        </div>
                        <Comment reviewId={review._id as string} commentsData={review.comments} />
                    </div>
                )
            }
        </div>
    )
}