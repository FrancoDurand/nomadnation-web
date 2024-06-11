import { Button, Input } from "@chakra-ui/react"
import "./LoginForm.css"
import { useState } from "react";
import { UserService } from "../../services/user-service";

const buttonStyles = {
    bg: "#18181c",
    color: "#fff",
    fontFamily: "Roboto",
    _hover: {
        bg: "#383842"
    },
    size: "lg"
}

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = { email, password };
            const response = await UserService.login(user);

            if (response && response.id) {
                sessionStorage.setItem('userId', response.id);
            }
        } catch (e: any) {
            alert("error")
        }
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form__title">Bienvenido</label>
                <div className="form__inputs">
                    <Input
                        placeholder='Email'
                        width='auto'
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder='Contraseña'
                        width='auto'
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button {...buttonStyles} type="submit">Iniciar sesión</Button>
            </form>
        </div>
    )
}