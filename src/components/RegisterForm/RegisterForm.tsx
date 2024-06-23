import { Avatar, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/iuser";
import { UserService } from "../../services/user-service";
import "./RegisterForm.css";
import { LoginContext } from "../../contexts/LoginContext";

const buttonStyles = {
    bg: "#18181c",
    color: "#fff",
    fontFamily: "Roboto",
    _hover: {
        bg: "#383842"
    },
    size: "lg"
}

export function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState<File>();
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });
    const { setLoggedIn } = useContext(LoginContext);

    const handleBlur = (field: string) => {
        setTouched({
            ...touched,
            [field]: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = { name, email, password, profilePic };
            const response: IUser = await UserService.register(user);

            if (response && response._id && response.name && response.profilePic) {
                sessionStorage.setItem('userId', response._id);
                sessionStorage.setItem('userName', response.name);
                sessionStorage.setItem('userProfilePic', UserService.getImage(response.profilePic as string));
                setLoggedIn(true);
            }

            navigate("/");
        } catch (e: any) {
            alert("error")
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];

            setProfilePic(file);
        }
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form__title">Únete</label>
                <div className="form__inputs-register">
                    <label htmlFor="avatar" className="form__inputs-avatar">
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            style={{ display: "none" }}
                            multiple={false}
                            onChange={handleImageChange}
                        />
                        <Avatar size="xl" src={profilePic ? URL.createObjectURL(profilePic) : ""} />
                    </label>
                    <FormControl isInvalid={touched.name && !name} className="form__control">
                        <Input
                            placeholder='Nombre'
                            width='auto'
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => handleBlur("name")}
                        />
                        {touched.name &&
                            !name &&
                            <FormErrorMessage>El nombre es requerido.</FormErrorMessage>
                        }
                    </FormControl>
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
                <Button {...buttonStyles} type="submit">Registrarse</Button>
            </form>
        </div >
    )
}