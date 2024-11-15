import { z } from "zod";

export const checkoutSchema = z.object({
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    paymentType: z.string().min(1, "Payment type is required"),
    cardHolder: z.string().min(1, "Card holder name is required"),
    accountNumber: z.string().min(1, "Account Number is required"),
    expiryDate: z.string().min(1, "Expiry Dates is required"),
    cvv: z.string().min(1, "CVV is required"),
    isDefault: z.boolean(),
});

export type CheckoutFormFields = z.infer<typeof checkoutSchema>;
