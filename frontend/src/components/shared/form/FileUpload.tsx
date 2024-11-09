interface Props {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  accept?: string;
}

const FileUpload = ({ id, label, onChange, error = "", accept }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={id}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={onChange}
        accept={accept}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default FileUpload