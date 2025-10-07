import React from "react";
import PropTypes from "prop-types";
import styles from "./Divider.module.css";

function Divider({ className }) {
  return <div className={`${styles.divider} ${className || ""}`}></div>;
}

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
