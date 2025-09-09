import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/Reserve/Reserve.module.css";

export default function ConfirmationMessage({ people, restaurantName, time, date }) {
  return (
    <div className={styles.confirmationContainer}>
      <p className={styles.confirmationMessage}>
        We have reserved a table for <strong>{people}</strong> at{" "}
        <strong>{restaurantName}</strong> for the <strong>{time}</strong> of{" "}
        <strong>{date}</strong>. You will receive an email and a text message
        with the details.
      </p>
    </div>
  );
}

ConfirmationMessage.propTypes = {
  people: PropTypes.number.isRequired,
  restaurantName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};