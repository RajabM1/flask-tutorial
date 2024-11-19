import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";

export const useStripeSetup = (amountInCents: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchStripeKey = async () => {
            try {
                const response = await HttpService.getRequest("config");
                setStripePromise(loadStripe(response.publishableKey));
            } catch (error) {
                console.error("Error fetching Stripe configuration:", error);
            }
        };

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

        fetchStripeKey();
        fetchPaymentIntent();
    }, [amountInCents]);

    return { stripePromise, clientSecret };
};
