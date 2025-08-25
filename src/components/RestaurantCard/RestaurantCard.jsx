import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './RestaurantCard.module.css';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  let typeValue = '';
  if (Array.isArray(restaurant.type)) {
    typeValue = restaurant.type.join(', ');
  } else if (typeof restaurant.type === 'string') {
    typeValue = restaurant.type;
  }
  const type = typeValue.toLowerCase();

  const showVeg = type.includes('veg');
  const showNonVeg = type.includes('non-veg') || type.includes('nonveg');

  const isCertified = (() => {
    const val =
      restaurant.isCertified ??
      restaurant.is_certified ??
      restaurant.certified ??
      restaurant.certificate;

    if (val === true) return true;
    if (val === false || val == null) return false;
    if (typeof val === 'string') return val.trim().toLowerCase() === 'true';
    if (typeof val === 'number') return val === 1;
    return false;
  })();

  const img =
    restaurant.restaurantImageSrc ||
    restaurant.thumbnail;
  const name = restaurant.name || 'Restaurant';
  const location = restaurant.location || 'Unknown location';
  const timing = restaurant.timings || 'N/A';
  const rating = restaurant.rating ?? '-';
  const cuisinesArr =
    Array.isArray(restaurant.cuisine)
      ? restaurant.cuisine
      : typeof restaurant.cuisine === 'string'
      ? restaurant.cuisine.split(',').map(s => s.trim())
      : [];

  return (
    <div
      className={styles.card}
      onClick={() => nav(`/restaurant/${restaurant.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className={`${styles.overlay} ${hover ? styles.overlayVisible : ''}`}>
          {/* Top Row */}
          <div className={styles.topRow}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.typeCert}>
              {isCertified && (
                <img
                  src={process.env.PUBLIC_URL + '/images/award.png'}
                  alt="Certified"
                  className={styles.award}
                />
              )}
              {showVeg && <span className={`${styles.dot} ${styles.veg}`} />}
              {showNonVeg && <span className={`${styles.dot} ${styles.nonveg}`} />}
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.location}>{location}</div>
            <div className={styles.bottomRow}>
              <span className={styles.time}>{timing}</span>
              <span className={styles.rating}>
                
                {rating}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  style={{ marginLeft: '4px' }}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.886 
                           1.48 8.308L12 18.896l-7.416 4.604 
                           1.48-8.308L0 9.306l8.332-1.151z"/>
                </svg>
              </span>
            </div>
          </div>

          {hover && (
            <div className={styles.hoverBlock}>
              <div className={styles.cuisines}>
                {cuisinesArr.length
                  ? cuisinesArr.join(', ')
                  : 'No cuisines listed'}
              </div>
              <button
                className={styles.viewMore}
                onClick={(e) => {
                  e.stopPropagation();
                  nav(`/restaurant/${restaurant.id}`);
                }}
              >
                View More Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    isCertified: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    is_certified: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    certified: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    certificate: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    timings: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cuisine: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    restaurantImageSrc: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired
};

export default RestaurantCard;
