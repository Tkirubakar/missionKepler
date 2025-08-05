import React from 'react';
import styles from './SuccessBanner.module.css';
import PropTypes from 'prop-types';

const SuccessBanner = ({ data }) => {
  return (
    <div className={styles.banner}>
      <p>
      Thank you, {data.name} for expression Your interest in travelling with us. Our Sales team will get back packages from <strong>{data.destination}</strong> to{' '}
        <strong>{data.hometown}</strong>.
      </p>
    </div>
  );
};

SuccessBanner.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    hometown: PropTypes.string,
    destination: PropTypes.string,
  }).isRequired,
};

export default SuccessBanner;
