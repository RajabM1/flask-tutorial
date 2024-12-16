import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    label: string;
    error?: boolean;
    helperText?: string;
    register?: UseFormRegisterReturn;
    fullWidth?: boolean;
}

const PasswordInput = ({
    id,
    label,
    error,
    helperText = "",
    register,
    fullWidth = true,
    ...rest
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <TextField
            id={id}
            label={label}
            type={showPassword ? "text" : "password"}
            error={!!error}
            helperText={helperText}
            fullWidth={fullWidth}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...register}
            {...rest}
        />
    );
};

export default PasswordInput;
