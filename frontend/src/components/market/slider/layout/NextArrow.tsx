import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ArrowProps {
    onClick?: () => void;
    hidden: boolean;
}

export const NextArrow = ({ onClick, hidden }: ArrowProps) => (
    <IconButton
        onClick={onClick}
        sx={{
            display: hidden ? "none" : "flex",
            position: "absolute",
            top: "-40px",
            right: "-10px",
            transform: "translateY(-50%)",
            zIndex: 1,
            color: "#000",
        }}
    >
        <ArrowForwardIcon />
    </IconButton>
);
