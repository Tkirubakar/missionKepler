import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/Reserve/Reserve.module.css";

export default function Image({ src, alt, className = "" }) {
  return (
    <img
      src={src || "https://via.placeholder.com/150"}
      alt={alt || "image"}
      className={`${styles.iconImg} ${className}`}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};