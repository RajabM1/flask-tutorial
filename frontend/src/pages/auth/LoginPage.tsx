import FormInput from "../../components/shared/form/FormInput";
import SubmitButton from "../../components/shared/buttons/SubmitButton";
import Message from "../../components/shared/feedback/Message";
import TextWithLink from "../../components/shared/navigation/TextWithLink";
import { useLoginForm } from "../../hooks/auth/useLoginForm";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import Divider from "@mui/material/Divider";
import "../../../styles/pages/auth/LoginPage.scss";

const LoginPage = () => {
    const { t } = useTranslation("login-page");
    const { formData, formError, handleInputChange, handleSubmit, loginError } =
        useLoginForm();
    return (
        <Container className="login-page" maxWidth="sm">
            {loginError && <Message message={loginError} type="danger" />}

            <Box className="form-header">
                <Avatar className="avatar-lock">
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("labels.sign_in")}
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
                    id="password"
                    type="password"
                    label={t("labels.password")}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <Box className="remember-forgot">
                    <FormControlLabel
                        control={<Checkbox />}
                        label={t("labels.remember_me")}
                    />
                    <Link href="#" variant="body2">
                        {t("labels.forget_password")}
                    </Link>
                </Box>

                <SubmitButton label={t("labels.sign_in")} color="black"/>

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

                <Box className="signup-link">
                    <TextWithLink
                        text={t("labels.do_not_have_account")}
                        linkText={t("labels.sign_up")}
                        to="/register"
                    />
                </Box>
            </form>
        </Container>
    );
};

export default LoginPage;
