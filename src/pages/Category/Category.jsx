import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import Cart from "../../components/Cart/Cart";
import Wishlist from "../../components/Wishlist/Wishlist";
import styles from "./Category.module.css";

function Category() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("cart");
  const { cart, wishlist, placeOrder } = useContext(StoreContext);

  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    fetch(
      `https://jsonmockserver.vercel.app/api/shopping/furniture/products?category=${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() =>
        import("../../data/furniture.json").then((local) =>
          setProducts(local.products[categoryId] || [])
        )
      );
  }, [categoryId]);

  // scroll handler to toggle "near" class
  useEffect(() => {
    const THRESHOLD = 10; // px scrolled before toggling class
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY || window.pageYOffset;
          setIsNear(scrolled > THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) navigate("/");
  };

  const sidebarVisible = cart.length > 0 || wishlist.length > 0;

  return (
    <div className={styles.categoryPage}>
      <div className={styles.layout}>
        <div
          className={`${styles.products} ${
            sidebarVisible ? styles.three : styles.four
          }`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => setView("cart")}
              onAddToWishlist={() => setView("wishlist")}
            />
          ))}
        </div>

        {sidebarVisible && (
          <div
            className={`${styles.sidePanel} ${isNear ? styles.near : ""}`}
          >
            <div className={styles.toggle}>
              <button
                className={view === "cart" ? styles.active : ""}
                onClick={() => setView("cart")}
              >
                My Cart
              </button>
              <button
                className={view === "wishlist" ? styles.active : ""}
                onClick={() => setView("wishlist")}
              >
                My Wishlist
              </button>
            </div>

            {view === "cart" ? (
              <Cart onPlaceOrder={handlePlaceOrder} />
            ) : (
              <Wishlist />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;