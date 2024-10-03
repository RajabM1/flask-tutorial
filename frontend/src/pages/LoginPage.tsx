import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../service/HttpService";
import Root from "./Root";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/button/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";
import TextWithLink from "../components/TextWithLink";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoginError("");

        try {
            const body = {
                username: username,
                password_hash: password,
            };

            const response = await HttpService.postRequest("auth/login", body);

            localStorage.setItem("accessToken", response.access_token);
            localStorage.setItem("refreshToken", response.refresh_token);
            navigate("/", { replace: true });
        } catch {
            setLoginError("Invalid email or password");
        }
    };

    return (
        <Root>
            <form className="form-signin" onSubmit={handleLogin}>
                <ErrorMessage message={loginError} type="danger" />
                <FormInput
                    id="username"
                    type="text"
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

                <SubmitButton label="Sign In" color="primary" />

                <TextWithLink
                    text="Don't have an account?"
                    linkText="Sign Up"
                    to="/register"
                />
            </form>
        </Root>
    );
};

export default LoginPage;
