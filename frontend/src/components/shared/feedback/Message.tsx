const Message = ({ message, type }: { message: string; type: string }) => {
    return (
        <>{message && <div className={`alert alert-${type}`}>{message}</div>}</>
    );
};

export default Message;
