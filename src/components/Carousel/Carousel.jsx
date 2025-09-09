import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.module.css';
import useInterval from '../../utils/useInterval';

function Carousel({ items, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const count = items?.length || 0;

  const next = useCallback(() => setIndex(i => (i + 1) % count), [count]);

  // Auto-slide respecting pause
  useInterval(() => {
    if (!pause && count > 0) {
      next();
    }
  }, count > 0 ? interval : null);

  const goToSlide = (idx) => {
    setIndex(idx);
    setPause(true); // pause after clicking
    setTimeout(() => setPause(false), interval); // resume after interval
  };

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  if (!items || items.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrap}>
        <img
          key={index}
          src={items[index].image}
          alt={items[index].title || 'slide'}
        />
        <p
          key={'desc-' + index}
          className={`${styles.centerOverlay} ${styles.fadeText}`}
        >
          {items[index].description}
        </p>
      </div>

      <div className={styles.stepper}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === index ? styles.active : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  })),
  interval: PropTypes.number
};

export default Carousel;