import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/Reserve/Reserve.module.css";

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  ...rest
}) {
  const isDate = type === "date";
  const isTime = type === "time";

  const inputClass = [
    styles.input,
    isDate && styles.dateInput,
    isTime && styles.timeInput,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.singleRow}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...rest}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string
};
