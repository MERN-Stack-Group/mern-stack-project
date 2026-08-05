import React from "react";

const FormField = ({
  label,
  error,
  helperText,
  children,
  className = "",
  htmlFor,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-semibold text-text-primary"
        >
          {label}
        </label>
      )}

      {children}

      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}

      {helperText && !error && (
        <p className="text-xs text-text-secondary mt-0.5">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;
