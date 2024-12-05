import { LoginFormData } from "../../types/loginForm";
import { RegisterFormData } from "../../types/registerForm";
import { User } from "../../types/user";

export interface IAuthContext {
    authToken?: string | null;
    currentUser?: User | null;
    handleRegister: (formData: RegisterFormData) => Promise<unknown | void>;
    handleLogin: (formData: LoginFormData) => Promise<unknown | void>;
    handleLogout: () => Promise<void>;
}
