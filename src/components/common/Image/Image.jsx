import React from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";

function Image({ src, alt, className }) {
  return <img src={src} alt={alt} className={`${styles.image} ${className || ""}`} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;
