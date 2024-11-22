import { useState } from "react";
import { useShoppingCart } from "./useShoppingCart";

interface Props {
    couponCode: string;
    isCouponApplied: boolean;
    isLoading: boolean;
    errorMessage: string;
    updateCouponCode: (code: string) => void;
    handleApplyCoupon: () => Promise<void>;
}

export const useCoupon = (
    setDiscount: (discount: number) => void,
    setCouponCode: (code: string) => void
): Props => {
    const { cartSummary, handleCouponApply } = useShoppingCart();

    const [couponCode, updateCouponCode] = useState("");
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;

        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await handleCouponApply(
                couponCode.trim().toUpperCase(),
                cartSummary.total
            );
            setDiscount(response);
            setCouponCode(couponCode.trim().toUpperCase());
            setIsCouponApplied(true);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        couponCode,
        isCouponApplied,
        isLoading,
        errorMessage,
        updateCouponCode,
        handleApplyCoupon,
    };
};
