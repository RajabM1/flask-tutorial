interface Props {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}

const FormInput = ({ id, type, label, value, onChange, required = false }: Props) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="form-control"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default FormInput;
