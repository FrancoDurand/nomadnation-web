import { ReactNode, useState } from 'react';
import { LoginContext, LoginContextType } from './LoginContext';

export function LoginContextProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
        const saved = sessionStorage.getItem("userId");
        return saved != null ? true : false;
    });

    const LoginContextValue: LoginContextType = {
        isLoggedIn,
        setLoggedIn
    }

    return (
        <LoginContext.Provider value={LoginContextValue}>
            {children}
        </LoginContext.Provider>
    );
};