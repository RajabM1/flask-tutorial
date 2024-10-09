import Root from "./Root";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/button/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";
import TextWithLink from "../components/TextWithLink";
import { useLoginForm } from "../hooks/useLoginForm";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const { t } = useTranslation('login-page');
    const { formData, formError, handleInputChange, handleLogin, loginError } = useLoginForm();
    return (
        <Root>
            <ErrorMessage message={loginError} type="danger" />
            <form className="form-signin" onSubmit={handleLogin}>
                <FormInput
                    id="username"
                    type="text"
                    label={t('username_label')}
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formError.username}
                />
                <FormInput
                    id="password"
                    type="password"
                    label={t('password_label')}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <SubmitButton label={t('sign_in')} color="primary" />
                <TextWithLink
                    text={t('do_not_have_account')}
                    linkText={t('sign_up')}
                    to="/register"
                />
            </form>
        </Root>
    );
};

export default LoginPage;
