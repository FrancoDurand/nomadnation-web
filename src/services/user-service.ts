import IUser from "../interfaces/iuser";
import { ApiService } from "./api-service";

export class UserService extends ApiService {
    static URL: string = ApiService.URL + "/users"

    static async login(user: Pick<IUser, "email" | "password">) {
        const requestURL = UserService.URL + "/login";

        try {
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            };

            const response = await fetch(requestURL, requestOptions);

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = response.json();

            return data;
        }
        catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }

    static getImage(route: string): string {
        return UserService.URL + route;
    }
}