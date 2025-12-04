import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ children, onClick, type="button" }){
  return <button className={styles.btn} onClick={onClick} type={type}>{children}</button>;
}

Button.propTypes = { children: PropTypes.node, onClick: PropTypes.func, type: PropTypes.string };
