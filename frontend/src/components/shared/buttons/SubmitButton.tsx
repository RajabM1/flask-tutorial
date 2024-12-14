import Button from "@mui/material/Button";

interface Props {
    label: string;
    color?: string;
    isSubmitting?: boolean;
    fullWidth?: boolean;
}

const SubmitButton = ({
    label,
    color = "black",
    isSubmitting = false,
    fullWidth = true,
}: Props) => {
    return (
        <Button
            variant="contained"
            type="submit"
            fullWidth={fullWidth}
            disabled={isSubmitting}
            sx={{
                backgroundColor: color,
            }}
        >
            {isSubmitting ? "Loading..." : label}
        </Button>
    );
};

export default SubmitButton;
