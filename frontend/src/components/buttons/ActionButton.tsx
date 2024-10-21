interface Props {
    label: string;
    color: string;
    onClick?: (e: React.MouseEvent) => void;
}

const ActionButton = ({ label, color, onClick }: Props) => {
    return (
        <button className={`btn btn-outline btn-${color} me-2`} onClick={onClick}>
            {label}
        </button>
    );
};

export default ActionButton;
