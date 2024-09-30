import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpService from "../service/HttpService";
import Root from "./Root";

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
                {loginError && <div className="alert alert-danger">{loginError}</div>}

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                    Sign in
                </button>

                <div className="mt-3">
                    <h6 className="d-inline">Don't have an account?</h6>
                    <Link
                        to="/register"
                        className="text-secondary ms-2 text-decoration-none"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </Root>
    );
};

export default LoginPage;
