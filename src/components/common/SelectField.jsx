import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/Reserve/Reserve.module.css";

export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  required = false
}) {
  return (
    <div className={styles.singleRow}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {options.map((opt, idx) =>
          typeof opt === "string" ? (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  required: PropTypes.bool
};
