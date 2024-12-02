import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

interface Props {
    id: string;
    type: string;
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormInput = ({ id, type, label, value, onChange, error = "" }: Props) => {
    return (
        <Box mt={3}>
            <TextField
                type={type}
                id={id}
                name={id}
                label={label}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error}
                fullWidth
            />
        </Box>
    );
};

export default FormInput;
