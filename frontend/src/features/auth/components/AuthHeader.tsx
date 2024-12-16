import { Avatar, Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

interface Props {
    page: string;
    message: string;
}

const AuthHeader = ({ page, message }: Props) => {
    return (
        <Box className="form-header">
            <Avatar className="avatar-lock">
                <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {page}
            </Typography>
            <Typography variant="body2" className="welcome-message">
                {message}
            </Typography>
        </Box>
    );
};

export default AuthHeader;
