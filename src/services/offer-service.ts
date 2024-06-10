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

    static getImage(route: string): string {
        return OfferService.URL + route;
    }
}