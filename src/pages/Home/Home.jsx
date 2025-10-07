import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { StoreContext } from "../../context/StoreContext";
import { formatCurrency } from "../../utils/formatCurrency";
import Image from "../../components/common/Image/Image";
import Button from "../../components/common/Button/Button";
import Divider from "../../components/common/Divider/Divider";

function Home() {
  const [categories, setCategories] = useState([]);
  const { orders } = useContext(StoreContext);
  const latestOrder = orders && orders.length > 0 ? orders[0] : null;

  useEffect(() => {
    import("../../data/furniture.json")
      .then((local) => setCategories(local.categories))
      .catch((err) => console.error("Error loading local data:", err));
  }, []);

  return (
    <>
      <div className={styles.orderCardSection}>
        {latestOrder && (
          <section className={styles.orderConfirmSection}>
            <div className={styles.orderHeader}>
              <h2>Order Confirmed 🎉</h2>
              <p>Thank you for your order — here's what you bought:</p>
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

                  <Divider className={styles.dividerLine} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={styles.home}>
        <h1 className={styles.heading}>Your Home, With Love</h1>
        <h4 className={styles.innerheading}>
          Come, Choose from millions of products
        </h4>

        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <Image
                src={category.image}
                alt={category.name}
                className={styles.image}
              />
              <h2 className={styles.categoryName}>{category.name}</h2>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>

              <Link to={`/categories/${category.id}`}>
                <Button className={styles.btn}>Shop Now</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;