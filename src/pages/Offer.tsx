/* import { useParams } from "react-router-dom"
import { OfferService } from "../services/offer-service";
import { useEffect, useState } from "react";
import IOffer from "../interfaces/ioffer";
import { ReviewService } from "../services/review-service"; */
import { Review } from "../components/Review/Review";

export function Offer() {
    /* const { id } = useParams();
    const [offerData, setOfferData] = useState<IOffer>();
    useEffect(() => {
        const fetchOffer = async () => {
            if (id) {
                const data = await OfferService.getOfferById(id);
                setOfferData(data);
            }
        };

        fetchOffer();
    }, []); */


    return (
        <>
            <Review />
        </>
    )
}