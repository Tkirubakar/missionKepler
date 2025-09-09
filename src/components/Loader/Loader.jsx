import React from "react";
import styles from "./Loader.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      Loading...
    </div>
  );
}

export default Loading;