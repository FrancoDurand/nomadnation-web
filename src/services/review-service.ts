import IComment from "../interfaces/icomment";
import IMedia from "../interfaces/imedia";
import IReview from "../interfaces/ireview";
import IReviewPost from "../interfaces/ireviewpost";
import { ApiService } from "./api-service";
import { UserService } from "./user-service";

export class ReviewService extends ApiService {
    static URL: string = ApiService.URL + "/reviews"

    /*  static async getOffers() {
         const requestURL = ReviewService.URL + "/getAll";
 
         try {
             const response = await fetch(requestURL);
 
             const offers: IOffer[] = await response.json();
 
             offers.forEach((offer: IOffer) => {
                 offer.images = offer.images.map((image: string) => ReviewService.getImage(image));
             });
 
             return offers;
         }
         catch (e: any) {
             console.error(e.message);
         }
     } */

    static async getByOffer(_id: string) {
        const requestURL = ReviewService.URL + "/getByOffer";
        const offerData = {
            offer: _id
        }
        try {
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(offerData)
            };
            const response = await fetch(requestURL, requestOptions);

            const reviewData: IReview[] = await response.json();

            reviewData.forEach((review: IReview) => {
                review.author.profilePic = UserService.getImage(review.author.profilePic as string);

                review.media.forEach((media: IMedia) => {
                    media.route = ReviewService.getImage(media.route);
                });

                review.comments.forEach((comment: IComment) => {
                    comment.author.profilePic = UserService.getImage(comment.author.profilePic as string);
                });
            });

            return reviewData;
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    static async comment(comment: IReviewPost) {
        const requestURL = ReviewService.URL + "/comment";

        try {
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            };
            await fetch(requestURL, requestOptions);

            /* const reviewData: IReview = await response.json();

            console.log(reviewData)

            return reviewData; */
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    static getImage(route: string): string {
        return ReviewService.URL + route;
    }
}