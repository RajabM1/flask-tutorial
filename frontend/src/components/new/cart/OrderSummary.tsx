import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/cart/confirm");
  };
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
          $3440.00
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Shipping Fee
        </Typography>
        <Typography variant="body1" color="text.primary">
          $250.00
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Saved
        </Typography>
        <Typography variant="body1" color="#d32f2f">
          - $379.00
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "black" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Total</Typography>
        <Typography variant="subtitle1">$2942.0</Typography>
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
        Checkout (6)
      </Button>
    </Box>
  );
};

export default OrderSummary;
