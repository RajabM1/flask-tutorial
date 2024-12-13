import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";
import { useFetch } from "../shared/useFetch";
import endpoints from "../../config/api";

export const useStripeSetup = (amount: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");

    const amountInCents = amount * 100;

    const {
        data: stripeConfig,
        error: stripeConfigError,
        isLoading,
    } = useFetch(endpoints.STRIPE.CONFIG);
    useEffect(() => {
        if (!isLoading && stripeConfig && stripeConfig.publishableKey) {
            setStripePromise(loadStripe(stripeConfig.publishableKey));
        }
    }, [isLoading, stripeConfig]);

    if (stripeConfigError) {
        console.error(
            "Error fetching Stripe configuration:",
            stripeConfigError
        );
    }

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            try {
                const response = await HttpService.postRequest(
                    endpoints.STRIPE.CREATE_PAYMENT_INTENT,
                    {
                        amount: amountInCents,
                        currency: "usd",
                    }
                );
                setPaymentIntentId(response.data.id);
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };
        if (!paymentIntentId) {
            fetchPaymentIntent();
        }
    }, [amountInCents, paymentIntentId]);

    return { stripePromise, clientSecret };
};
