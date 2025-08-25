import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurants } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './RestaurantDetail.module.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchRestaurants()
      .then(list => {
        if (!mounted) return;
        const found = (list || []).find(r => String(r.id) === String(id));
        setRestaurant(found || null);
        setLoading(false);
      })
      .catch(e => {
        if (mounted) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Failed to load: {error}</div>;
  if (!restaurant) return <div className={styles.error}>Restaurant not found</div>;

  const items = restaurant.menu || restaurant.items || [];

  return (
    <div>
      <div className="pageBackground">
        <div className="pageBackgroundInner">
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <p className={styles.description}>{restaurant.description}</p>

              {items.length > 0 ? (
                <div className={styles.menuList}>
                  {items.slice(0, 10).map((item, idx) => {
                      const isEven = idx % 2 === 1;
                      return (
                        <div
                          key={idx}
                          className={`${styles.menuCard} ${isEven ? styles.reverse : ''} ${isEven ? styles.even : styles.odd}`}
                        >
                          <div className={styles.imageWrapper}>
                            <img
                              src={item.imageSrc || 'https://via.placeholder.com/320x220'}
                              alt={item.name}
                              className={styles.menuImage}
                            />
                          </div>
                          <div className={styles.restaurantDetails}>
                            <h3 className={styles.menuTitle}>{item.name}</h3>
                            <p className={styles.menuDescription}>{item.description}</p>
                            <div className={styles.menuPrice}>$ {item.Price}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className={styles.noMenu}>No menu items available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
