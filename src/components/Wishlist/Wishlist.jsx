import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import styles from "./Wishlist.module.css";
import { formatCurrency } from "../../utils/formatCurrency";

function Wishlist() {
  const { wishlist, moveToCart } = useContext(StoreContext);

  return (
    <div className={styles.wishlist}>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ul className={styles.list}>
          {wishlist.map((wishlistDetails) => (
            <li key={wishlistDetails.id} className={styles.item}>
              <img src={wishlistDetails.image} alt={wishlistDetails.title} />
              <div className={styles.details}>
                <h4 className={styles.wishlistTitle}>{wishlistDetails.title}</h4>
                <p className={styles.wishlistPrice}>{formatCurrency(wishlistDetails.price)}</p>
                <div className={styles.actions}>
                  <button onClick={() => moveToCart(wishlistDetails)}>Add to Cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;