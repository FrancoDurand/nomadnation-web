import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { ReviewContext } from "../../contexts/ReviewContext";
import { ReviewService } from "../../services/review-service";
import "./ModalReview.css";

const buttonStyles = {
    bg: "#18181c",
    color: "#fff",
    fontFamily: "Roboto",
    _hover: {
        bg: "#383842"
    },
    size: "lg"
}

export function ModalReview() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { offer } = useContext(ReviewContext);
    const { title, setTitle } = useContext(ReviewContext);
    const { post, setPost } = useContext(ReviewContext);
    const { media, setMedia } = useContext(ReviewContext);
    const { author } = useContext(ReviewContext);
    const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);

    const { isLoggedIn } = useContext(LoginContext);
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast({
                title: 'Sesión no iniciada',
                description: 'Debes iniciar sesión para publicar una reseña',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            return;
        }

        const review = {
            offer,
            author,
            title,
            post,
            media
        }
        console.log(review);

        try {
            const response = await ReviewService.create(review);
            if (response)
                toast({
                    title: 'Reseña publicada',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
        }
        catch (e) {
            toast({
                title: 'No se pudo publicar la reseña',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleMediaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);

            setMedia(e.target.files)
            setMediaPreviewUrl(imageUrl);
        }
    }

    return (
        <>
            <Button {...buttonStyles} onClick={onOpen}>Publicar reseña</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <form className="form__review" onSubmit={(e) => handleSubmit(e)}>
                    <ModalContent height={"80vh"}>
                        <ModalHeader fontFamily={"Roboto"}>Nueva reseña</ModalHeader>
                        <ModalBody>
                            <div className="form__inputs">
                                <label htmlFor="title">Título</label>
                                <Input
                                    id="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label htmlFor="post">Reseña</label>
                                <Textarea
                                    id="post"
                                    resize="none"
                                    onChange={(e) => setPost(e.target.value)}
                                />
                                <label htmlFor="media">Fotos ({media ? media.length : "0"})</label>
                                <Input
                                    ref={fileInputRef}
                                    id="media"
                                    type="file"
                                    accept="image/*"
                                    multiple={true}
                                    onChange={handleMediaChange}
                                />
                                <div
                                    className="form__images"
                                    onClick={handleMediaClick}
                                    style={
                                        {
                                            backgroundImage: mediaPreviewUrl ? `url(${mediaPreviewUrl})` : "none",
                                            opacity: mediaPreviewUrl ? 0.75 : 1
                                        }
                                    }
                                >
                                    {mediaPreviewUrl ? "" : "Haz clic aquí para agregar imágenes"}
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button {...buttonStyles} mr={3} size={"md"} onClick={onClose}>
                                Cerrar
                            </Button>
                            <Button
                                fontFamily={"Roboto"}
                                colorScheme='blue' mr={3}
                                size={"md"}
                                onClick={onClose}
                                type="submit"
                            >
                                Publicar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal >
        </>
    )
}