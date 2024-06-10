import { useEffect, useRef, useState } from "react";
import IOffer from "../../interfaces/ioffer";
import { EmblaCarousel } from "../Carousel/Carousel";
import "./OfferCard.css";
import Autoplay from "embla-carousel-autoplay";

const options = {
    loop: true,
};

export function OfferCard({ ...offer }: IOffer) {
    const autoplay = useRef(Autoplay({ delay: 1800, playOnInit: false }));
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);

    useEffect(() => {
        if (autoplayEnabled) {
            autoplay.current.play();
        } else {
            autoplay.current.stop();
        }
    }, [autoplayEnabled]);

    const handleMouseEnter = () => {
        setAutoplayEnabled(true);
    }

    const handleMouseLeave = () => {
        setAutoplayEnabled(false);
    }

    return (
        <div
            className="offercard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href={`/offer/${offer._id}`}>
                <div className="offercard__image-container">
                    <EmblaCarousel
                        images={offer.images}
                        options={options}
                        plugins={[autoplay.current]}
                    />
                </div>
                <div className="offercard__info">
                    <h3 className="offercard__title">{offer.destination}</h3>
                    <p className="offercard__description">{offer.description}</p>
                    <p className="offercard__price">Desde S/{offer.price}</p>
                </div>
            </a>
        </div>
    )
}