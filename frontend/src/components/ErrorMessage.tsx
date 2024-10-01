interface Props {
    message: string;
    type: string;
}

const ErrorMessage = ({ message, type }: Props) => {
    return (
        <>{message && <div className={`alert alert-${type}`}>{message}</div>}</>
    );
};

export default ErrorMessage;
