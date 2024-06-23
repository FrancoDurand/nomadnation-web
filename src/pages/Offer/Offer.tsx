import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmblaCarousel } from "../../components/Carousel/Carousel";
import { Review } from "../../components/Review/Review";
import { ReviewContextProvider } from "../../contexts/ReviewContext/ReviewContextProvider";
import IOffer from "../../interfaces/ioffer";
import { OfferService } from "../../services/offer-service";
import "./Offer.css";

const options = {
    loop: true,
};

const plugins = [
    Autoplay({ delay: 4500 })
]

export function Offer() {
    const { id } = useParams();

    const [offerData, setOfferData] = useState<IOffer>();

    useEffect(() => {
        const fetchOffer = async () => {
            if (id) {
                const data = await OfferService.getOfferById(id);

                if (data)
                    setOfferData(data);
            }
        };

        fetchOffer();
    }, []);

    return (
        <ReviewContextProvider>
            <div className="offer">
                <div className="offer__image-container">
                    {offerData?.images && (
                        <EmblaCarousel
                            images={offerData.images}
                            options={options}
                            plugins={plugins}
                        />
                    )}
                </div>
                <div className="offer__info">
                    <h2 className="offer__info-title">
                        {offerData?.destination}
                    </h2>
                    <p className="offer__info-description">{offerData?.description}</p>
                    <p className="offer__info-price">Desde S/{offerData?.price}</p>
                </div>
            </div>
            <Review />
        </ReviewContextProvider>
    )
}