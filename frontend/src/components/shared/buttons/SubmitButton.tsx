import Button from "@mui/material/Button";

const SubmitButton = ({ label, color }: { label: string; color: string }) => {
    return (
        <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", backgroundColor: `${color}` }}
        >
            {label}
        </Button>
    );
};

export default SubmitButton;
