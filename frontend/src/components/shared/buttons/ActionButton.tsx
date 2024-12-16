import { Button } from "@mui/material";

interface Props {
    label: string;
    className: string;
    onClick?: (e: React.MouseEvent) => void;
}

const ActionButton = ({ label, className, onClick }: Props) => {
    return (
        <Button className={className} onClick={onClick}>
            {label}
        </Button>
    );
};

export default ActionButton;
