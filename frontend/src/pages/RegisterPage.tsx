import { useNavigate } from "react-router-dom";
import Root from "./Root";
import { useState } from "react";
import HttpService from "../service/HttpService";
import TextWithLink from "../components/TextWithLink";
import SubmitButton from "../components/button/SubmitButton";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";

function RegisterPage() {
    const [registrationError, setRegistrationError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setRegistrationError("");

        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match");
            return;
        }

        const body = {
            username: username,
            email: email,
            password_hash: password,
        };

        try {
            const response = await HttpService.postRequest("auth/register", body);
            localStorage.setItem("accessToken", response.access_token);
            localStorage.setItem("refreshToken", response.refresh_token);
            navigate("/", { replace: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setRegistrationError(error.response?.data?.message);
        }
    };

    return (
        <Root>
            <form className="form-signin" onSubmit={handleRegister}>
                <ErrorMessage message={registrationError} type="danger" />

                <FormInput
                    id="username"
                    type="text"
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <FormInput
                    id="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FormInput
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <SubmitButton label="Create Account" color="primary" />

                <TextWithLink
                    text="Already have an account?"
                    linkText="Sign In"
                    to="/login"
                />
            </form>
        </Root>
    );
}

export default RegisterPage;
