import { useRegisterForm } from "../../hooks/auth/useRegisterForm";
import SubmitButton from "../../components/buttons/SubmitButton";
import FormInput from "../../components/form/FormInput";
import TextWithLink from "../../components/navigation/TextWithLink";
import Message from "../../components/feedback/Message";
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
        <Container
            maxWidth="sm"
            sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Message message={registerError} type="danger" />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    mb: 3,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "black" }}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("labels.sign_up")}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {t("messages.welcome")}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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

                <Box sx={{ my: 2 }}>
                    <SubmitButton label={t("labels.create_account_btn")} color="black" />
                </Box>

                <Divider sx={{ my: 2 }}>OR</Divider>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            bgcolor: "white",
                            color: "text.secondary",
                            "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                    >
                        <GoogleIcon />
                    </Avatar>
                    <Avatar
                        variant="rounded"
                        sx={{
                            bgcolor: "white",
                            color: "text.secondary",
                            "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                    >
                        <AppleIcon />
                    </Avatar>
                    <Avatar
                        variant="rounded"
                        sx={{
                            bgcolor: "white",
                            color: "text.secondary",
                            "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                    >
                        <FacebookIcon />
                    </Avatar>
                </Box>
                <Box sx={{ mt: 3, my: 3, textAlign: "center" }}>
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
