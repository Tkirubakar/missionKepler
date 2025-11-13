import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Image from "../../components/common/Image/Image";
import Button from "../../components/common/Button/Button";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    import("../../data/furniture.json")
      .then((local) => setCategories(local.categories))
      .catch((err) => console.error("Error loading local data:", err));
  }, []);

  return (
    <>
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