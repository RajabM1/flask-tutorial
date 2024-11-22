import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { useCoupon } from "../../../hooks/cart/useCoupon";

const CouponSection = ({
    setDiscount,
    setCouponCode,
}: {
    setDiscount: (discount: number) => void;
    setCouponCode: (code: string) => void;
}) => {
    const {
        couponCode,
        isCouponApplied,
        isLoading,
        errorMessage,
        updateCouponCode,
        handleApplyCoupon,
    } = useCoupon(setDiscount, setCouponCode);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 9 }}>
                <TextField
                    type="text"
                    label="Coupon Code"
                    fullWidth
                    value={couponCode}
                    onChange={(e) => updateCouponCode(e.target.value)}
                    disabled={isCouponApplied || isLoading}
                    error={!!errorMessage}
                    helperText={errorMessage}
                />
            </Grid2>
            <Grid2 size={{ xs: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    fullWidth
                    sx={{ height: "100%", backgroundColor: "black" }}
                    aria-label="Apply Coupon"
                    disabled={isCouponApplied || isLoading}
                >
                    {isLoading
                        ? "Loading..."
                        : isCouponApplied
                        ? "Applied"
                        : "Apply"}
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default CouponSection;
