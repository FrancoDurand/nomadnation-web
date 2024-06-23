import { createContext } from 'react';
import IReview from '../../interfaces/ireview';

export type ReviewContextType = {
    media: FileList | null;
    setMedia: (media: FileList) => void;
    offer: string;
    setOffer: (offerId: string) => void;
    author: string;
    setAuthor: (authorId: string) => void;
    title: string;
    setTitle: (title: string) => void;
    post: string;
    setPost: (post: string) => void;
    reviews: IReview[];
    setReviews: (reviews: IReview[]) => void;
}

export const ReviewContext = createContext<ReviewContextType>({
    media: null,
    setMedia: () => { },
    offer: "",
    setOffer: () => { },
    author: "",
    setAuthor: () => { },
    title: "",
    setTitle: () => { },
    post: "",
    setPost: () => { },
    reviews: [],
    setReviews: () => { }
});