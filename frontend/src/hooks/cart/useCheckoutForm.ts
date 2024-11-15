import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CheckoutFormFields,
    checkoutSchema,
} from "../../schemas/checkoutSchema";

export const useCheckoutForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch
    } = useForm<CheckoutFormFields>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            isDefault: true,
        },
    });

    const onSubmit: SubmitHandler<CheckoutFormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Checkout Data:", data);
        } catch (error) {
            console.log("Submission Error", error);
        }
    };

    return {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        setValue,
        watch
    };
};
