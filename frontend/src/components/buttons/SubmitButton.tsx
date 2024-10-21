const SubmitButton = ({ label, color }: { label: string; color: string }) => {
    return (
        <button className={`btn btn-${color} w-100`} type="submit">
            {label}
        </button>
    );
};

export default SubmitButton;
