import { Avatar, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
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
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);

    const handleLogOut = () => {
        setLoggedIn(false);
        sessionStorage.removeItem("userId");
    }

    return (
        <header className="header">
            <h1 className="header__title" ><a href="/">NomadNation</a></h1>
            <div className="header__buttons">
                {
                    isLoggedIn
                        ? (
                            <>
                                <div className="header__userinfo">
                                    <Avatar src={sessionStorage.getItem('userProfilePic') as string} />
                                    <h2 className="header__userinfo-username">{sessionStorage.getItem('userName')}</h2>
                                </div>
                                <Button
                                    {...loginStyles}
                                    onClick={handleLogOut}
                                >Cerrar sesión</Button>
                            </>
                        )
                        : (
                            <>
                                <a href="/login">
                                    <Button {...loginStyles}>Iniciar sesión</Button>
                                </a>
                                <a href="/register">
                                    <Button {...registerStyles}>Registrarse</Button>
                                </a>
                            </>
                        )
                }
            </div>
        </header>
    )
}