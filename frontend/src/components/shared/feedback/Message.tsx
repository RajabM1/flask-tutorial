import { Alert } from "@mui/material";
import { PageMessageType } from "../../../types/pageMessage";
import { useEffect, useState } from "react";

const Message = ({ message, type }: PageMessageType) => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
    }, []);

    return (
        <>
            {message && visible && (
                <Alert severity={type} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
        </>
    );
};

export default Message;
