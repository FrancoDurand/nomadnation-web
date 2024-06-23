import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewContext, ReviewContextType } from './ReviewContext';
import IReview from '../../interfaces/ireview';

export function ReviewContextProvider({ children }: { children: ReactNode }) {
    const { id } = useParams();

    const [media, setMedia] = useState<FileList | null>(null);
    const [offer, setOffer] = useState(() => {
        return id ? id : ""
    });
    const [author, setAuthor] = useState(() => {
        const saved = sessionStorage.getItem('userId');
        return saved ? saved : ""
    });
    const [title, setTitle] = useState<string>("");
    const [post, setPost] = useState<string>("");
    const [reviews, setReviews] = useState<IReview[]>([]);

    const ReviewContextValue: ReviewContextType = {
        media,
        setMedia,
        offer,
        setOffer,
        author,
        setAuthor,
        title,
        setTitle,
        post,
        setPost,
        reviews,
        setReviews
    }

    return (
        <ReviewContext.Provider value={ReviewContextValue}>
            {children}
        </ReviewContext.Provider>
    );
};