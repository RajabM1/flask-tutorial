import FormInput from "../../components/form/FormInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import Message from "../../components/feedback/Message";
import TextWithLink from "../../components/navigation/TextWithLink";
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

const LoginPage = () => {
    const { t } = useTranslation("login-page");
    const { formData, formError, handleInputChange, handleSubmit, loginError } =
        useLoginForm();
    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {loginError && <Message message={loginError} type="danger" />}

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
                    {t("labels.sign_in")}
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
                    id="password"
                    type="password"
                    label={t("labels.password")}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formError.password}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={t("labels.remember_me")}
                    />
                    <Link href="#" variant="body2" color="inherit">
                        {t("labels.forget_password")}
                    </Link>
                </Box>

                <SubmitButton label={t("labels.sign_in")} color="black" />

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

                <Box sx={{ mt: 3, textAlign: "center" }}>
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
