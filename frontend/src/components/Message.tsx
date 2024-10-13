interface Props {
    message: string;
    type: string;
}

const Message = ({ message, type }: Props) => {
    return (
        <>{message && <div className={`alert alert-${type}`}>{message}</div>}</>
    );
};

export default Message;
