import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid2,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormInput from "../../form/FormInput";
import { SetStateAction, useState } from "react";

const PaymentInformation = () => {
  const [paymentType, setPaymentType] = useState("visa");

  const [cardNumber, setCardNumber] = useState("3761 5902 7458 4956");
  const [cvv, setCvv] = useState("123");
  const [expirationDate, setExpirationDate] = useState("07/28");

  const handlePaymentTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const handleChange = () => {
    console.log("Hello World");
  };

  return (
    <Box pt={3} px={2}>
      <Box mb={2}>
        <Typography variant="h5" component="div" gutterBottom>
          Payment Methods
        </Typography>
        <FormControl component="fieldset" fullWidth sx={{ p: 2 }}>
          <RadioGroup
            aria-label="Payment options"
            name="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            sx={{
              flexDirection: { sm: "column", md: "row" },
              gap: 2,
            }}
          >
            <Card
              raised={paymentType === "visa"}
              sx={{
                maxWidth: { sm: "100%", md: "50%" },
                flexGrow: 1,
                outline: "1px solid",
                outlineColor:
                  paymentType === "visa" ? "primary.main" : "divider",
                backgroundColor:
                  paymentType === "visa" ? "background.default" : "",
              }}
            >
              <CardActionArea onClick={() => setPaymentType("visa")}>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src="https://www.svgrepo.com/show/333620/visa.svg"
                    alt="Visa"
                    width={60}
                    height={40}
                  />
                  <Typography fontWeight="medium">
                    Debit / Credit Card
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              raised={paymentType === "PayPal"}
              sx={{
                maxWidth: { sm: "100%", md: "50%" },
                flexGrow: 1,
                outline: "1px solid",
                outlineColor:
                  paymentType === "PayPal" ? "primary.main" : "divider",
                backgroundColor:
                  paymentType === "PayPal" ? "background.default" : "",
              }}
            >
              <CardActionArea onClick={() => setPaymentType("PayPal")}>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src="https://www.svgrepo.com/show/508716/paypal.svg"
                    alt="PayPal"
                    width={60}
                    height={40}
                  />
                  <Typography fontWeight="medium">PayPal</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              raised={paymentType === "ApplePay"}
              sx={{
                maxWidth: { sm: "100%", md: "50%" },
                flexGrow: 1,
                outline: "1px solid",
                outlineColor:
                  paymentType === "ApplePay" ? "primary.main" : "divider",
                backgroundColor:
                  paymentType === "ApplePay" ? "background.default" : "",
              }}
            >
              <CardActionArea onClick={() => setPaymentType("ApplePay")}>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src="https://www.svgrepo.com/show/508402/apple-pay.svg"
                    alt="Apple Pay"
                    width={60}
                    height={40}
                  />

                  <Typography fontWeight="medium">Apple Pay</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </RadioGroup>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="h5" component="div" gutterBottom>
          Card Information
        </Typography>
        <Grid2 container spacing={2} sx={{ px: 2 }}>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <FormInput
              id="cardHolderName"
              type="text"
              label="Card Holder Name"
              value={"Rajab Fahmi Rajab Masri"}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              id="cardNumber"
              type="text"
              label="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <FormInput
              id="expirationDate"
              type="text"
              label="Expiration Date"
              value={expirationDate}
              onChange={handleExpirationDateChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <FormInput
              id="cvv"
              type="text"
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
            />
          </Grid2>
        </Grid2>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Your payment information is securely encrypted and will not be stored
          on this device.
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentInformation;
