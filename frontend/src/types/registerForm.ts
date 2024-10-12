export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type RegisterFormError = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}