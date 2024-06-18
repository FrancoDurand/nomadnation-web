import { ReactNode, createContext, useState } from 'react';

// Definir el tipo del contexto
type LoginContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (val: boolean) => void;
}

// Crear el contexto con valores predeterminados
export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    setLoggedIn: () => { },
});

// Definir el proveedor del contexto usando React.FC
export function LoginContextProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setLoggedIn] = useState(false);

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