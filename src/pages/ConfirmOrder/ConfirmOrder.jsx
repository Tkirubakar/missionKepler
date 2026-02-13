import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import styles from "../Home/Home.module.css";
import { formatCurrency } from "../../utils/formatCurrency";
import Image from "../../components/common/Image/Image";
import Home from "../Home/Home"; 

function ConfirmOrder() {
  const { orders } = useContext(StoreContext);
  const latestOrder = orders && orders.length > 0 ? orders[0] : null;

  return (
    <>
      <div className={styles.orderCardSection}>
        {latestOrder ? (
          <section className={styles.orderConfirmSection}>
            <div className={styles.orderHeader}>
              <h2>Order Confirmed</h2>
              <p>Thank you for shopping with us. The items will be delivery with in 7 days.</p>
            </div>

            <div className={styles.orderGrid}>
              {latestOrder.items.map((orderItem) => (
                <div key={orderItem.id} className={styles.orderCard}>
                  <div className={styles.rowTop}>
                    <Image
                      src={orderItem.image}
                      alt={orderItem.title}
                      className={styles.prodImage}
                    />
                  </div>
                  <div className={styles.titlePrice}>
                      <div className={styles.title}>{orderItem.title}</div>
                      <div className={styles.price}>
                        {formatCurrency(orderItem.price)}
                      </div>
                  </div>
                <div className={styles.rowQty}>
                  Qty: <strong>{orderItem.quantity}</strong>
                </div>

                <div className={styles.rowDesc}>
                  {orderItem.description}
                </div>

              </div>
            ))}
          </div>
        </section>
        ) : (
          <section className={styles.orderConfirmSection}>
            <div className={styles.orderHeader}>
              <h2>No Orders Found</h2>
              <p>Please place an order to see your confirmation here.</p>
              <a href="/" className={styles.continueBtn}>
                Go to Home →
              </a>
            </div>
          </section>
        )}
      </div>
      <Home />
    </>
  );
}

export default ConfirmOrder;