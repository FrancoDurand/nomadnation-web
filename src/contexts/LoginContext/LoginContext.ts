import { createContext } from "react";

export type LoginContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (val: boolean) => void;
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    setLoggedIn: () => { },
});