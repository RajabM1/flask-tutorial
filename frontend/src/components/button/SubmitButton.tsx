interface Props {
    label: string;
    color: string;
}

const SubmitButton = ({ label, color }: Props) => {
    return (
        <button className={`btn btn-${color} w-100`} type="submit">
            {label}
        </button>
    );
};

export default SubmitButton;
