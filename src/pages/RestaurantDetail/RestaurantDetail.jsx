import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurants } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import styles from "./RestaurantDetail.module.css";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants().then((restaurantList) => {
      const foundRestaurant = (restaurantList || []).find(
        (restaurantItem) => String(restaurantItem.id) === String(id)
      );
      setRestaurant(foundRestaurant || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!restaurant)
    return <div className={styles.error}>Restaurant not found</div>;

  const menuItems = restaurant.menu || restaurant.items || [];

  return (
    <div>
      <div className="pageBackground">
        <div className="pageBackgroundInner">
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <p className={styles.description}>{restaurant.description}</p>

              {menuItems.length > 0 ? (
                <div className={styles.menuList}>
                  {menuItems.slice(0, 10).map((menuItem, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <div
                        key={index}
                        className={`${styles.menuCard} ${
                          isEven ? styles.reverse : ""
                        } ${isEven ? styles.even : styles.odd}`}
                      >
                        <div className={styles.imageWrapper}>
                          <img
                            src={
                              menuItem.imageSrc ||
                              "https://via.placeholder.com/320x220"
                            }
                            alt={menuItem.name}
                            className={styles.menuImage}
                          />
                        </div>
                        <div className={styles.restaurantDetails}>
                          <h3 className={styles.menuTitle}>{menuItem.name}</h3>
                          <p className={styles.menuDescription}>
                            {menuItem.description}
                          </p>
                          <div className={styles.menuPrice}>
                            ${menuItem.Price}
                          </div>
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