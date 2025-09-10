import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Carousel.module.css";
import Image from "../Common/Image";
import Button from "../Common/Button";

export default function Carousel({ items, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length),
      interval
    );
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrap}>
        <Image
          src={items[currentIndex].image}
          alt={items[currentIndex].title}
          className={styles.carouselImage}
        />
        <p className={styles.centerOverlay}>{items[currentIndex].description}</p>
      </div>

      <div className={styles.stepper}>
        {items.map((_, index) => (
          <Button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  interval: PropTypes.number,
};
