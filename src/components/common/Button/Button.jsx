import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, onClick, className, type = "button" }) {
  return (
    <button type={type} className={`${styles.button} ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
