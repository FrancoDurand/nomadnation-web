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
                const error = new Error('Invalid credentials');
                error.name = 'LoginError';
                throw error;
            }

            const data = response.json();

            return data;
        }
        catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }

    static async register(user: Pick<IUser, "name" | "email" | "password" | "profilePic">) {
        const requestURL = UserService.URL + "/register";

        try {
            const formData = new FormData();

            formData.append("name", user.name);
            formData.append("email", user.email);
            if (user.password) formData.append("password", user.password);
            if (user.profilePic) formData.append("profilePic", user.profilePic);

            const requestOptions: RequestInit = {
                method: 'POST',

                body: formData
            };

            const response = await fetch(requestURL, requestOptions);

            if (!response.ok)
                throw new Error('Invalid data');

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