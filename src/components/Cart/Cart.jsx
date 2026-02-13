import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import styles from "./Cart.module.css";
import { formatCurrency } from "../../utils/formatCurrency"; 

function Cart({ onPlaceOrder }) {
  const { cart, updateQuantity } = useContext(StoreContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  return (
    <div className={styles.cart}>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.image} alt={item.title} />
                <div className={styles.details}>
                  <h4 className={styles.cartTitle}>{item.title}</h4>
                  <p className={styles.cartPrice}>{formatCurrency(item.price)}</p>
                  <div className={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <div className={styles.totalAmount}>
              <div className={styles.totalText}><p>Total Amount</p></div>
              <div className={styles.totalNumbers}>{formatCurrency(total)}</div>
            </div>
            <button className={styles.orderBtn} onClick={onPlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;