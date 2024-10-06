import Root from "./Root";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/button/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";
import TextWithLink from "../components/TextWithLink";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginPage = () => {
    const { formData, formError, handleInputChange, handleLogin, loginError } = useLoginForm();
    return (
        <Root>
            <ErrorMessage message={loginError} type="danger" />
            <form className="form-signin" onSubmit={handleLogin}>
                <FormInput
                    id="username"
                    type="text"
                    label="User Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formError.username}
                />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
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
