import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectInput.module.css';

const SelectInput = ({ label, name, value, onChange, options }) => (
  <div className={styles.field}>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required>
      <option value="">Choose</option>
      {options.map((option, index) => (
        <option key={`${name}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectInput;