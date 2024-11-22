import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CouponSection from "./CouponSection";
import { useState } from "react";
import DiscountIcon from "@mui/icons-material/Discount";

interface Props {
    cartSummary: {
        subTotal: number;
        saved: number;
        total: number;
    };
    itemCount: number;
    shippingFee?: number;
}
const OrderSummary = ({
    cartSummary: { subTotal, saved, total },
    itemCount,
}: Props) => {
    const { t } = useTranslation("order-summary");
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate("/cart/confirm");
    };
    const [discount, setDiscount] = useState<number | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    return (
        <Box className="order-summary-container">
            <Typography variant="h6" component="h1" className="summary-title">
                {t("title")}
            </Typography>
            <CouponSection
                setDiscount={setDiscount}
                setCouponCode={setCouponCode}
            />
            <Box className="summary-item">
                <Typography variant="body1" className="s-t-c">
                    {t("details.subtotal")}
                </Typography>
                <Typography variant="body1" className="p-t-c">
                    {formatCurrency(subTotal)}
                </Typography>
            </Box>
            <Box className="summary-item">
                <Typography variant="body1" className="s-t-c">
                    {t("details.saved")}
                </Typography>
                <Typography variant="body1" className="offer-t-c">
                    - {formatCurrency(saved)}
                </Typography>
            </Box>
            {discount && (
                <>
                    <Box className="summary-item">
                        <Typography variant="body1" className="s-t-c">
                            Discount:
                        </Typography>
                    </Box>
                    <Box className="summary-item">
                        <Box sx={{display:"flex"}}>
                            <DiscountIcon fontSize="small" />
                            <Typography>{couponCode}</Typography>
                        </Box>
                        <Typography variant="body1" className="offer-t-c">
                            - {formatCurrency(discount)}
                        </Typography>
                    </Box>
                </>
            )}
            <Divider className="divider" />
            <Box className="summary-item">
                <Typography variant="subtitle1">{t("total")}</Typography>
                <Typography variant="subtitle1">
                    {formatCurrency(total)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                className="checkout-button"
                onClick={handleCheckout}
            >
                {t("button.checkout")} ({itemCount})
            </Button>
        </Box>
    );
};

export default OrderSummary;
