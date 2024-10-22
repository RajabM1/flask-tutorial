import Root from "../Root";
import FormInput from "../../components/form/FormInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import Message from "../../components/feedback/Message";
import TextWithLink from "../../components/navigation/TextWithLink";
import { useLoginForm } from "../../hooks/auth/useLoginForm";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const { t } = useTranslation('login-page');
    const { formData, formError, handleInputChange, handleSubmit, loginError } = useLoginForm();
    return (
        <Root>
            <Message message={loginError} type="danger" />
            <form className="form-signin" onSubmit={handleSubmit}>
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
