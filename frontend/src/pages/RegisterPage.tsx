import Root from "./Root";
import { useRegisterForm } from "../hooks/useRegisterForm";
import SubmitButton from "../components/button/SubmitButton";
import FormInput from "../components/FormInput";
import TextWithLink from "../components/TextWithLink";
import ErrorMessage from "../components/ErrorMessage";

const RegisterPage = () => {
    const { formData, formError, handleInputChange, handleRegister, registerError } = useRegisterForm();

    return (
        <Root>
            <ErrorMessage message={registerError} type="danger" />
            <form className="form-signin" onSubmit={handleRegister}>
                <FormInput
                    id="username"
                    type="text"
                    label="User Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formError.username}
                />
                <FormInput
                    id="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formError.email}
                />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <FormInput
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={formError.confirmPassword}
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
