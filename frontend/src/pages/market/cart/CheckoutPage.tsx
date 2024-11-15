import Container from "@mui/material/Container";
import Root from "../Root";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShippingInformation from "../../../components/market/cart/ShippingInformation";
import PaymentInformation from "../../../components/market/cart/PaymentInformation";
import OrderPreview from "../../../components/market/cart/OrderPreview";
import Button from "@mui/material/Button";
import { useCheckoutForm } from "../../../hooks/cart/useCheckoutForm";

const CheckoutPage = () => {
    const {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        setValue,
        watch,
    } = useCheckoutForm();

    return (
        <Root>
            <Container maxWidth="xl" className="cart-page">
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        CheckOut
                    </Typography>
                </Box>
                <Grid2 container spacing={2} p={2}>
                    <Grid2 size={{ xs: 12, md: 7 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ShippingInformation
                                register={register}
                                errors={errors}
                            />
                            <PaymentInformation
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                watch={watch}
                            />
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                type="submit"
                            >
                                {isSubmitting ? "Loading..." : "Place Order"}
                            </Button>
                        </form>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 5 }}
                        sx={{ position: "relative" }}
                    >
                        <Box sx={{ position: "sticky", top: 80 }}>
                            <OrderPreview />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default CheckoutPage;
