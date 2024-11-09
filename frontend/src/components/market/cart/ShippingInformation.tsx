import Box from "@mui/material/Box";
import FormInput from "../../shared/form/FormInput";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";

const ShippingInformation = () => {
    const handleChange = () => {
        console.log("Hello World");
    };

    return (
        <Box pt={3}>
            <Typography variant="h5" component="div" gutterBottom>
                Personal Information
            </Typography>
            <Grid2 container spacing={2} px={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="firstName"
                        type="text"
                        label="First Name"
                        value={"Rajab"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="lastName"
                        type="text"
                        label="Last Name"
                        value={"Masri"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="email"
                        type="email"
                        label="Email"
                        value={"rajab.masri@gmail.com"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="phone"
                        type="text"
                        label="Phone Number"
                        value={"+972 592463634"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <FormInput
                        id="country"
                        type="text"
                        label="Country"
                        value={"Palestine"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <FormInput
                        id="state"
                        type="text"
                        label="State"
                        value={" "}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <FormInput
                        id="postalCode"
                        type="text"
                        label="Postal Code"
                        value={"240"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="address"
                        type="text"
                        label="Address"
                        value={"Amman str eraq al taeh"}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormInput
                        id="city"
                        type="text"
                        label="City"
                        value={"Nablus"}
                        onChange={handleChange}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ShippingInformation;
