import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.css';

const TextInput = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <div className={styles.field}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextInput;