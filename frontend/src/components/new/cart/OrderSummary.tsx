import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
interface Props {
  cartSummary: {
    subTotal: number;
    saved: number;
  };
  itemCount: number;
  shippingFee?: number;
}
const OrderSummary = ({ cartSummary: { subTotal, saved }, itemCount, shippingFee = 0 }: Props) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/cart/confirm");
  };
  const total = subTotal + shippingFee - saved;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#fff",
        marginBottom: 4,
      }}
    >
      <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
        Order Summary
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Subtotal
        </Typography>
        <Typography variant="body1" color="text.primary">
          {formatCurrency(subTotal)}
        </Typography>

      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Shipping Fee
        </Typography>
        <Typography variant="body1" color="text.primary">
          {formatCurrency(shippingFee)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Saved
        </Typography>
        <Typography variant="body1" color="#d32f2f">
          - {formatCurrency(saved)}
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "black" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Total</Typography>
        <Typography variant="subtitle1">{formatCurrency(total)}</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          borderRadius: "24px",
          padding: "10px 20px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        onClick={handleCheckout}
      >
        Checkout ({itemCount})
      </Button>
    </Box>
  );
};

export default OrderSummary;
