import { Container } from "@mui/material";
import Root from "../Root";
import HorizontalLinearStepper from "../../../components/new/stepper/HorizontalLinearStepper";

const ConfirmationPage = () => {
    return (
        <Root>
            <Container maxWidth="xl">
                <HorizontalLinearStepper />
            </Container>
        </Root>
    );
};

export default ConfirmationPage;
