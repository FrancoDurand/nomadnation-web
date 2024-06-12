import { Button } from "@chakra-ui/react";
import "./Header.css";

const registerStyles = {
    bg: "#edf2f7",
    color: "#18181c",
    fontFamily: "Roboto",
    _hover: {
        bg: "#bcc0c3"
    }
}

const loginStyles = {
    bg: "#18181c",
    color: "#fff",
    fontFamily: "Roboto",
    _hover: {
        bg: "#383842"
    }
}

export function Header() {
    return (
        <header className="header">
            <h1 className="header__title" ><a href="/">NomadNation</a></h1>
            <div className="header__buttons">
                <a href="/login">
                    <Button {...loginStyles}>Iniciar sesión</Button>
                </a>
                <a href="/register">
                    <Button {...registerStyles}>Registrarse</Button>
                </a>
            </div>
        </header>
    )
}