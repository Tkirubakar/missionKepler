import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/Reserve/Reserve.module.css";

export default function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.submitButton} ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};