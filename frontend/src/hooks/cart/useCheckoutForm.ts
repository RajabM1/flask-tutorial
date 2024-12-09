import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import HttpService from "../../service/HttpService";
import {
    StripeAddressElement,
    StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { ShippingMethodType } from "../../types/shippingMethods";

export const useCheckoutForm = (clientSecret: string) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<
        string | null
    >(null);
    const [address, setAddress] = useState<string | null>(null);

    const saveAddressAndOrder = async (
        addressElement: StripeAddressElement
    ) => {
        const addressData = await addressElement.getValue();

        const addressResponse = await HttpService.postRequest(
            "users/addresses",
            addressData
        );
        const addressId = addressResponse.data.id;

        const orderResponse = await HttpService.postRequest("orders", {
            addressId,
            shippingMethodId: Number(selectedShippingMethodId),
        });
        const trackingCode = orderResponse.data.tracking_code;
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
                        state: {
                            addressId,
                            trackingCode,
                            selectedShippingMethodId,
                        },
                    });
                }
            }
        } catch (error: unknown) {
            console.log("Payment submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShippingMethodSelect = async (method: ShippingMethodType) => {
        setSelectedShippingMethodId(method.id);
        const s = await stripe?.retrievePaymentIntent(clientSecret);
        const paymentIntentId = s?.paymentIntent?.id;
        const amountInCents = s?.paymentIntent?.amount;
        await HttpService.postRequest("stripe/update-payment-intent", {
            paymentIntentId: paymentIntentId,
            amount: Number(amountInCents) + method.cost * 100,
            currency: "usd",
        });
    };

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        const addressLine1 = event.complete ? event.value.address.line1 : null;
        setAddress(addressLine1);
    };

    return {
        isLoading,
        handlePaymentSubmit,
        handleShippingMethodSelect,
        handleAddressChange,
        selectedShippingMethodId,
        address,
    };
};
