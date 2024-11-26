import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";
import { useFetch } from "../shared/useFetch";

export const useStripeSetup = (amountInCents: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState("");

    const { data: stripeConfig, error: stripeConfigError, isLoading } = useFetch("config");
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
                    "create-payment-intent",
                    {
                        amount: amountInCents,
                        currency: "usd",
                    }
                );
                setClientSecret(response.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };
        fetchPaymentIntent();
    }, [amountInCents]);

    return { stripePromise, clientSecret };
};
