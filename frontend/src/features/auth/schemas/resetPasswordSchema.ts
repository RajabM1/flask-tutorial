import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type resetPasswordForm = z.infer<typeof resetPasswordSchema>;
