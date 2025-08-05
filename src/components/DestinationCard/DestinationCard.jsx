import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DestinationCard.module.css';

const DestinationCard = ({ name, city, image, description }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.city}>{city}</p>
        <p className={styles.description}>{description}</p>
        <Link to={`/place/${city.toLowerCase()}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DestinationCard;
