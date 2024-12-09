import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElementOptions } from "@stripe/stripe-js";
import Button from "@mui/material/Button";
import { useCheckoutForm } from "../../../hooks/cart/useCheckoutForm";
import Box from "@mui/material/Box";
import ShippingMethods from "./ShippingMethods";

const CheckoutForm = ({
    clientSecret,
    setShippingFees,
    orderTotal,
}: {
    clientSecret: string;
    setShippingFees: React.Dispatch<React.SetStateAction<number | null>>;
    orderTotal: number;
}) => {
    const {
        isLoading,
        handlePaymentSubmit,
        isAddressComplete,
        handleAddressChange,
        selectedShippingMethod,
        handleShippingMethodSelect,
    } = useCheckoutForm(clientSecret, orderTotal);
    setShippingFees(selectedShippingMethod?.cost ?? null);
    const addressOptions: StripeAddressElementOptions = {
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
    };

    return (
        <Box component="form" onSubmit={handlePaymentSubmit}>
            <AddressElement
                options={addressOptions}
                onChange={handleAddressChange}
            />
            {isAddressComplete && (
                <ShippingMethods
                    selectedMethod={selectedShippingMethod?.id || null}
                    onSelectMethod={handleShippingMethodSelect}
                />
            )}

            <PaymentElement options={{ layout: "accordion" }} />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{
                    backgroundColor: isLoading ? "gray" : "black",
                    color: "white",
                    mt: 1,
                    py: 1.5,
                }}
            >
                {isLoading ? "Processing..." : "Place Order"}
            </Button>
        </Box>
    );
};

export default CheckoutForm;
