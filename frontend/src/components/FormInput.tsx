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
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FormInput;
