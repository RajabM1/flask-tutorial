import { Link, useNavigate } from "react-router-dom";
import Root from "./Root";
import { useState } from "react";
import HttpService from "../service/HttpService";

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
                {registrationError && (
                    <div className="alert alert-danger">{registrationError}</div>
                )}

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        User Name
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
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                    Create Account
                </button>

                <div className="mt-3">
                    <h6 className="d-inline">Already have an account?</h6>
                    <Link
                        to="/login"
                        className="text-secondary ms-2 text-decoration-none"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </Root>
    );
}

export default RegisterPage;
