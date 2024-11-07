import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";

const DeliverySummary = () => {
  const { t } = useTranslation("deliverySummary");
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
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "background.paper",
        margin: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocalShippingIcon sx={{ color: "black" }} />
        <Typography variant="body1" fontWeight="500">
          {t("fast_delivery")}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {t("refund_policy")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <VerifiedUserIcon sx={{ color: "black" }} />
        <Typography variant="body1" fontWeight="500">
          {t("security_privacy")}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {t("safe_payments")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PaymentIcon sx={{ color: "black" }} />
        <Typography variant="body1" fontWeight="500">
          {t("safe_payment")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://www.svgrepo.com/show/333620/visa.svg"
          alt="Visa"
          width={60}
          height={40}
        />
        <Box
          component="img"
          src="https://www.svgrepo.com/show/508701/mastercard-full.svg"
          alt="Mastercard"
          width={60}
          height={40}
        />
        <Box
          component="img"
          src="https://www.svgrepo.com/show/508402/apple-pay.svg"
          alt="Apple Pay"
          width={60}
          height={40}
        />
        <Box
          component="img"
          src="https://www.svgrepo.com/show/508404/amazon-pay.svg"
          alt="Amazon Pay"
          width={60}
          height={40}
        />
        <Box
          component="img"
          src="https://www.svgrepo.com/show/508716/paypal.svg"
          alt="PayPal"
          width={60}
          height={40}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {t("trusted_partners")}
      </Typography>
    </Box>
  );
};

export default DeliverySummary;
