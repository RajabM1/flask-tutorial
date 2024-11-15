import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CheckoutFormFields } from "../../../schemas/checkoutSchema";

interface Props {
    register: UseFormRegister<CheckoutFormFields>;
    errors: FieldErrors<CheckoutFormFields>;
}

const ShippingInformation = ({ register, errors }: Props) => {
    return (
        <Box pt={3}>
            <Typography variant="h5" component="div" gutterBottom>
                Shipping Information
            </Typography>
            <Grid2 container spacing={2} px={2}>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <TextField
                        {...register("title")}
                        type="text"
                        label="Title"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        {...register("firstName")}
                        type="text"
                        label="First Name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        {...register("lastName")}
                        type="text"
                        label="Last Name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <TextField
                        {...register("phoneNumber")}
                        type="text"
                        label="Phone Number"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        {...register("country")}
                        type="text"
                        label="Country"
                        error={!!errors.country}
                        helperText={errors.country?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        {...register("city")}
                        type="text"
                        label="City"
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        {...register("postalCode")}
                        type="text"
                        label="Postal Code"
                        error={!!errors.postalCode}
                        helperText={errors.postalCode?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <TextField
                        {...register("addressLine1")}
                        type="text"
                        label="Address Line 1"
                        error={!!errors.addressLine1}
                        helperText={errors.addressLine1?.message}
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <TextField
                        {...register("addressLine2")}
                        type="text"
                        label="Address Line 2"
                        error={!!errors.addressLine2}
                        helperText={errors.addressLine2?.message}
                        fullWidth
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ShippingInformation;
