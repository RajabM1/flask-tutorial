import TextField from "@mui/material/TextField";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    type: string;
    label: string;
    error?: boolean;
    helperText?: string;
    register?: UseFormRegisterReturn;
    fullWidth?: boolean;
}

const FormInput = ({
    id,
    type,
    label,
    error,
    helperText = "",
    register,
    fullWidth = true,
    ...rest
}: Props) => {
    return (
        <TextField
            type={type}
            id={id}
            label={label}
            error={!!error}
            helperText={helperText}
            fullWidth={fullWidth}
            {...register}
            {...rest}
        />
    );
};

export default FormInput;
