import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import HttpService from "../../service/HttpService";
import { StripeAddressElement } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

export const useCheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const saveAddressAndOrder = async (
        addressElement: StripeAddressElement
    ) => {
        const addressData = await addressElement.getValue();

        const addressResponse = await HttpService.postRequest(
            "users/address",
            addressData
        );
        const addressId = addressResponse.address.id;

        const orderResponse = await HttpService.postRequest("order", {
            addressId,
        });
        const trackingCode = orderResponse.tracking_code;
        await HttpService.deleteRequest("cart");

        return {
            addressId,
            trackingCode,
        };
    };

    const handlePaymentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        try {
            const paymentResult = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
                confirmParams: {
                    return_url: "http://localhost:5173/order/confirmation",
                },
            });

            if (paymentResult.paymentIntent?.status === "succeeded") {
                const addressElement = elements.getElement(AddressElement);
                if (addressElement) {
                    const { addressId, trackingCode } =
                        await saveAddressAndOrder(addressElement);
                    navigate("/order/confirmation", {
                        state: { addressId, trackingCode },
                    });
                }
            }
        } catch (error: unknown) {
            console.log("Payment submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handlePaymentSubmit,
    };
};
