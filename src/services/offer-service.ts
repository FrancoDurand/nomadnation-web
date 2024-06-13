import IOffer from "../interfaces/ioffer";
import { ApiService } from "./api-service";

export class OfferService extends ApiService {
    static URL: string = ApiService.URL + "/offers"

    static async getOffers() {
        const requestURL = OfferService.URL + "/getAll";

        try {
            const response = await fetch(requestURL);

            const offers: IOffer[] = await response.json();

            offers.forEach((offer: IOffer) => {
                offer.images = offer.images.map((image: string) => OfferService.getImage(image));
            });

            return offers;
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    static async getOfferById(_id: string) {
        const requestURL = OfferService.URL + "/getById";
        const offerData = {
            _id
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

            const offer: IOffer = await response.json();

            offer.images = offer.images.map((image: string) => OfferService.getImage(image));

            return offer;
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    static getImage(route: string): string {
        return OfferService.URL + route;
    }
}