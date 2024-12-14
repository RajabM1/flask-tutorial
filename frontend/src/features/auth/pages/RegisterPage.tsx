import { useRegisterForm } from "../hooks/useRegisterForm";
import TextWithLink from "../../../components/shared/navigation/TextWithLink";
import Message from "../../../components/shared/feedback/Message";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { paths } from "../../../config/paths";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../../../components/shared/form/FormInput";
import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import "../../../../styles/pages/auth/RegisterPage.scss";

const RegisterPage = () => {
    const { t } = useTranslation("register-page");
    const {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        registerError,
    } = useRegisterForm();

    return (
        <Container className="register-page" maxWidth="sm">
            {registerError && <Message message={registerError} type="danger" />}

            <AuthHeader
                page={t("labels.sign_up")}
                message={t("messages.welcome")}
            />

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box mt={3}>
                    <FormInput
                        type="text"
                        id="username"
                        label={t("labels.username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        register={register("username")}
                    />
                </Box>
                <Box mt={3}>
                    <FormInput
                        type="email"
                        id="email"
                        label={t("labels.email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        register={register("email")}
                    />
                </Box>
                <Box mt={3}>
                    <FormInput
                        type="password"
                        id="password"
                        label={t("labels.password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        register={register("password")}
                    />
                </Box>
                <Box mt={3}>
                    <FormInput
                        type="password"
                        id="confirmPassword"
                        label={t("labels.confirm_password")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        register={register("confirmPassword")}
                    />
                </Box>

                <Box className="submit">
                    <SubmitButton
                        label={t("labels.sign_up")}
                        color="black"
                        isSubmitting={isSubmitting}
                    />
                </Box>

                <Divider className="divider">OR</Divider>
                <SocialAuthButtons />
                <Box className="login-link">
                    <TextWithLink
                        text={t("labels.already_have_account")}
                        linkText={t("labels.sign_in")}
                        to={paths.AUTH.LOGIN}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
