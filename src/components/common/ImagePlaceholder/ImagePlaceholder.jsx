import React from "react";
import styles from "./ImagePlaceholder.module.css";
import PropTypes from "prop-types";

export default function ImagePlaceholder({ width="100%", height=240 }){
  return <div className={styles.placeholder} style={{width, height}} />;
}

ImagePlaceholder.propTypes = { width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) };
