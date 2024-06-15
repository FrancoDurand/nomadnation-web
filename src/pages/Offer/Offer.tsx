import { useParams } from "react-router-dom"
import { OfferService } from "../../services/offer-service";
import { useEffect, useState } from "react";
import IOffer from "../../interfaces/ioffer";
import { Review } from "../../components/Review/Review";
import { EmblaCarousel } from "../../components/Carousel/Carousel";
import "./Offer.css"
import Autoplay from "embla-carousel-autoplay";

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
        <>
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
        </>
    )
}