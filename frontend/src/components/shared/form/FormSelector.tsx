import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface Props {
    id: string;
    label: string;
    value?: number;
    data: { id: number; name: string }[];
    onChange: (e: SelectChangeEvent<number>) => void;
    error?: string;
}

const FormSelector = ({
    id,
    label,
    value,
    data,
    onChange,
    error = "",
}: Props) => {
    return (
        <FormControl fullWidth sx={{ mt: 3 }} error={!!error}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                label={label}
            >
                {data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default FormSelector;
