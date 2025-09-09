import React, { useState, useEffect } from "react";
import { fetchRestaurants } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import styles from "./Restaurants.module.css";

export default function Restaurants() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants().then((restaurantsResponse) => {
      const restaurantsArray = Array.isArray(restaurantsResponse)
        ? restaurantsResponse
        : restaurantsResponse?.data || [];
      setRestaurantList(restaurantsArray);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="pageBackground">
        <div className="pageBackgroundInner">
          <div className={styles.grid}>
            {(restaurantList || []).map((restaurantItem) => (
              <RestaurantCard
                key={restaurantItem.id}
                restaurant={{
                  ...restaurantItem,
                  image:
                    restaurantItem.image ||
                    restaurantItem.thumbnail ||
                    "https://via.placeholder.com/300x200",
                  isVeg: restaurantItem.veg || false,
                  isCertified:
                    restaurantItem.isCertified ??
                    restaurantItem.is_certified ??
                    false,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}