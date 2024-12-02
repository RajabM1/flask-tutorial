import { useRegisterForm } from "../../hooks/auth/useRegisterForm";
import SubmitButton from "../../components/shared/buttons/SubmitButton";
import FormInput from "../../components/shared/form/FormInput";
import TextWithLink from "../../components/shared/navigation/TextWithLink";
import Message from "../../components/shared/feedback/Message";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import "../../../styles/pages/auth/RegisterPage.scss";

const RegisterPage = () => {
    const { t } = useTranslation("register-page");
    const {
        formData,
        formError,
        handleInputChange,
        handleSubmit,
        registerError,
    } = useRegisterForm();

    return (
        <Container className="register-page" maxWidth="sm">
            <Message message={registerError} type="danger" />

            <Box className="form-header">
                <Avatar className="avatar-lock">
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("labels.sign_up")}
                </Typography>
                <Typography variant="body2" className="welcome-message">
                    {t("messages.welcome")}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <FormInput
                    id="username"
                    type="text"
                    label={t("labels.username")}
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formError.username}
                />
                <FormInput
                    id="email"
                    type="email"
                    label={t("labels.email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formError.email}
                />
                <FormInput
                    id="password"
                    type="password"
                    label={t("labels.password")}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <FormInput
                    id="confirmPassword"
                    type="password"
                    label={t("labels.confirm_password")}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={formError.confirmPassword}
                />

                <Box className="submit">
                    <SubmitButton
                        label={t("labels.create_account_btn")}
                        color="black"
                    />
                </Box>

                <Divider className="divider">OR</Divider>
                <Box className="social-login">
                    <Avatar variant="rounded" className="social-icon">
                        <GoogleIcon />
                    </Avatar>
                    <Avatar variant="rounded" className="social-icon">
                        <AppleIcon />
                    </Avatar>
                    <Avatar variant="rounded" className="social-icon">
                        <FacebookIcon />
                    </Avatar>
                </Box>
                <Box className="login-link">
                    <TextWithLink
                        text={t("labels.already_have_account")}
                        linkText={t("labels.sign_in")}
                        to="/login"
                    />
                </Box>
            </form>
        </Container>
    );
};

export default RegisterPage;
