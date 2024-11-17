import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElement } from "@stripe/stripe-js";
import Button from "@mui/material/Button";
import HttpService from "../../../service/HttpService";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const saveAddressAndOrder = async (
        addressElement: StripeAddressElement
    ) => {
        const addressData = await addressElement.getValue();
        const response = await HttpService.postRequest(
            "users/address",
            addressData
        );

        await HttpService.postRequest("order", {
            addressId: response.address.id,
        });
        await HttpService.deleteRequest("cart");
    };

    const handlePaymentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);
        try {
            const addressElement = elements.getElement(AddressElement);
            if (addressElement) {
                await saveAddressAndOrder(addressElement);
            }

            await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:5173",
                },
            });
        } catch {
            console.log("Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handlePaymentSubmit}>
            <AddressElement
                options={{
                    mode: "shipping",
                    fields: {
                        phone: "always",
                    },
                    validation: {
                        phone: {
                            required: "always",
                        },
                    },
                    autocomplete: {
                        mode: "automatic",
                    },
                    contacts: [],
                }}
            />
            <PaymentElement options={{ layout: "accordion" }} />
            {stripe && elements && (
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Place Order"}
                </Button>
            )}
        </form>
    );
};

export default CheckoutForm;
