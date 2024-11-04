import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShippingInformation from "../cart/ShippingInformation";
import PaymentInformation from "../cart/PaymentInformation";

const steps = ["Shipping Information", "Payment Information"];
const pages = [<ShippingInformation />, <PaymentInformation />];

export default function HorizontalLinearStepper() {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            navigate("/");
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "100%", mt: 3 }}>
            <Stepper
                activeStep={activeStep}
                sx={{
                    "& .MuiStepLabel-root": {
                        color: "gray",
                    },
                    "& .Mui-active": {
                        color: "black",
                    },
                    "& .Mui-completed": {
                        color: "black",
                    },
                }}
            >
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Fragment>
                {pages[activeStep]}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button onClick={handleNext} sx={{ color: "black" }}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Fragment>
        </Box>
    );
}
