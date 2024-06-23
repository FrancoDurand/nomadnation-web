import { ReactNode, createContext, useState } from 'react';
import { useParams } from 'react-router-dom';

// Definir el tipo del contexto
type ReviewContextType = {
    media: FileList | null;
    setMedia: (media: FileList) => void;
    offer: string;
    setOffer: (offerId: string) => void;
    author: string;
    setAuthor: (authorId: string) => void;
    title: string;
    setTitle: (title: string) => void;
    post: string;
    setPost: (post: string) => void
}

// Crear el contexto con valores predeterminados
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
    setPost: () => { }
});

// Definir el proveedor del contexto usando React.FC
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
        setPost
    }

    return (
        <ReviewContext.Provider value={ReviewContextValue}>
            {children}
        </ReviewContext.Provider>
    );
};