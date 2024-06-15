import { Button, FormControl, FormErrorMessage, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/iuser";
import { UserService } from "../../services/user-service";
import "./LoginForm.css";

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
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleBlur = (field: string) => {
        setTouched({
            ...touched,
            [field]: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = { email, password };
            const response: IUser = await UserService.login(user);

            if (response && response._id && response.name && response.profilePic) {
                sessionStorage.setItem('userId', response._id);
                sessionStorage.setItem('userName', response.name);
                sessionStorage.setItem('userProfilePic', UserService.getImage(response.profilePic as string));
            }

            navigate("/");
        } catch (e: any) {
            if (e.name === "LoginError") {
                onOpen();
            }
            else {
                alert("error")
            }
        }
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form__title">Bienvenido</label>
                <div className="form__inputs">
                    <FormControl isInvalid={touched.email && !email} className="form__control">
                        <Input
                            placeholder='Email'
                            width='auto'
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlur("email")}
                        />
                        {touched.email &&
                            !email &&
                            <FormErrorMessage>El email es requerido.</FormErrorMessage>
                        }
                    </FormControl>
                    <FormControl isInvalid={touched.password && !password} className="form__control">
                        <Input
                            placeholder='Contraseña'
                            width='auto'
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleBlur("password")}
                        />
                        {touched.password &&
                            !password &&
                            <FormErrorMessage>La contraseña es requerida.</FormErrorMessage>
                        }
                    </FormControl>
                </div>
                <Button {...buttonStyles} type="submit">Iniciar sesión</Button>
            </form>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody>
                        <span>Credenciales incorrectas</span>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    )
}