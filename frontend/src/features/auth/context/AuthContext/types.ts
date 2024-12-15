import { loginForm } from "../../schemas/loginSchema";
import { registerForm } from "../../schemas/registerSchema";
import { forgetPasswordForm } from "../../schemas/forgetPasswordSchema";
import { User } from "../../../../types/user";
import { resetPasswordForm } from "../../schemas/resetPasswordSchema";

export interface IAuthContext {
    authToken?: string | null;
    currentUser?: User | null;
    handleRegister: (formData: registerForm) => Promise<unknown | void>;
    handleLogin: (formData: loginForm) => Promise<unknown | void>;
    handleForgetPassword: (
        formData: forgetPasswordForm
    ) => Promise<unknown | void>;
    handleResetPassword: (
        formData: resetPasswordForm,
        token: string
    ) => Promise<unknown | void>;
    handleLogout: () => Promise<void>;
}
