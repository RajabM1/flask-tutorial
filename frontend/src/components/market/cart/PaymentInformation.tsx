import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Grid2 from "@mui/material/Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { CheckoutFormFields } from "../../../schemas/checkoutSchema";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

interface Props {
    register: UseFormRegister<CheckoutFormFields>;
    errors: FieldErrors<CheckoutFormFields>;
    setValue: UseFormSetValue<CheckoutFormFields>;
    watch: UseFormWatch<CheckoutFormFields>;
}

const PaymentInformation = ({ register, errors, setValue, watch }: Props) => {
    const paymentType = watch("paymentType", "visa");

    const handlePaymentTypeChange = (type: string) => {
        setValue("paymentType", type);
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
                        onChange={(e) =>
                            handlePaymentTypeChange(e.target.value)
                        }
                        sx={{
                            flexDirection: { sm: "column", md: "row" },
                            gap: 2,
                        }}
                    >
                        {[
                            {
                                type: "visa",
                                label: "Debit / Credit Card",
                                imgSrc: "https://www.svgrepo.com/show/333620/visa.svg",
                            },
                            {
                                type: "PayPal",
                                label: "PayPal",
                                imgSrc: "https://www.svgrepo.com/show/508716/paypal.svg",
                            },
                            {
                                type: "ApplePay",
                                label: "Apple Pay",
                                imgSrc: "https://www.svgrepo.com/show/508402/apple-pay.svg",
                            },
                        ].map(({ type, label, imgSrc }) => (
                            <Card
                                key={type}
                                raised={paymentType === type}
                                sx={{
                                    maxWidth: { sm: "100%", md: "50%" },
                                    flexGrow: 1,
                                    outline: "1px solid",
                                    outlineColor:
                                        paymentType === type
                                            ? "primary.main"
                                            : "divider",
                                    backgroundColor:
                                        paymentType === type
                                            ? "background.default"
                                            : "",
                                }}
                            >
                                <CardActionArea
                                    onClick={() =>
                                        handlePaymentTypeChange(type)
                                    }
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <img
                                            src={imgSrc}
                                            alt={label}
                                            width={60}
                                            height={40}
                                        />
                                        <Typography fontWeight="medium">
                                            {label}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box>
                <Typography variant="h5" component="div" gutterBottom>
                    Card Information
                </Typography>
                <Grid2 container spacing={2} sx={{ px: 2 }}>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <TextField
                            {...register("cardHolder")}
                            type="text"
                            label="Card Holder Name"
                            error={!!errors.cardHolder}
                            helperText={errors.cardHolder?.message}
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            {...register("accountNumber")}
                            type="text"
                            label="Card Number"
                            error={!!errors.accountNumber}
                            helperText={errors.accountNumber?.message}
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <TextField
                            {...register("expiryDate")}
                            type="text"
                            label="Expiration Date"
                            error={!!errors.expiryDate}
                            helperText={errors.expiryDate?.message}
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <TextField
                            {...register("cvv")}
                            type="text"
                            label="CVV"
                            error={!!errors.cvv}
                            helperText={errors.cvv?.message}
                            fullWidth
                        />
                    </Grid2>
                </Grid2>
                <FormControlLabel
                    control={<Radio checked={true} color="primary" />}
                    label="Set as default payment method"
                    sx={{ mt: 2 }}
                />
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 2 }}
                >
                    Your payment information is securely encrypted and will not
                    be stored on this device.
                </Typography>
            </Box>
        </Box>
    );
};

export default PaymentInformation;
