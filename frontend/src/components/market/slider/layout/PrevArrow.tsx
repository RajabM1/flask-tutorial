import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ArrowProps {
    onClick?: () => void;
    hidden: boolean;
}

export const PrevArrow = ({ onClick, hidden }: ArrowProps) => (
    <IconButton
        onClick={onClick}
        sx={{
            display: hidden ? "none" : "flex",
            position: "absolute",
            top: "-40px",
            right: "30px",
            transform: "translateY(-50%)",
            zIndex: 1,
            color: "#000",
        }}
    >
        <ArrowBackIcon />
    </IconButton>
);
