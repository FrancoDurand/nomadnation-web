import "./OfferList.css";
import IOffer from "../../interfaces/ioffer";
import { useEffect, useState } from "react";
import { OfferCard } from "../OfferCard/OfferCard";
import { OfferService } from "../../services/offer-service";

export function OfferList() {
    const [offers, setOffers] = useState<IOffer[]>([]);

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await OfferService.getOffers();
            if (data) {
                setOffers(data);
            }
        };

        fetchOffers();
    }, []);

    return (
        <>
            <h2 className="offer__title">Conoce nuestras ofertas</h2>
            <div className="offerlist">
                {
                    offers?.map((offer: IOffer) =>
                        <OfferCard {...offer} />
                    )
                }
            </div>
        </>
    )
}