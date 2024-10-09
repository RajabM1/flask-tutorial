import Root from "./Root";
import { useRegisterForm } from "../hooks/useRegisterForm";
import SubmitButton from "../components/button/SubmitButton";
import FormInput from "../components/FormInput";
import TextWithLink from "../components/TextWithLink";
import ErrorMessage from "../components/ErrorMessage";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
    const { t } = useTranslation('register-page');
    const { formData, formError, handleInputChange, handleRegister, registerError } = useRegisterForm();

    return (
        <Root>
            <ErrorMessage message={registerError} type="danger" />
            <form className="form-signin" onSubmit={handleRegister}>
                <FormInput
                    id="username"
                    type="text"
                    label={t('username_label')}
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formError.username}
                />
                <FormInput
                    id="email"
                    type="email"
                    label={t('email_label')}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formError.email}
                />
                <FormInput
                    id="password"
                    type="password"
                    label={t('password_label')}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <FormInput
                    id="confirmPassword"
                    type="password"
                    label={t('confirm_password_label')}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={formError.confirmPassword}
                />
                <SubmitButton label={t('create_account_btn')} color="primary" />
                <TextWithLink
                    text={t('already_have_account')}
                    linkText={t('sign_in')}
                    to="/login"
                />
            </form>
        </Root>
    );
}

export default RegisterPage;
