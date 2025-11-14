import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import Cart from "../../components/Cart/Cart";
import Wishlist from "../../components/Wishlist/Wishlist";
import styles from "./Category.module.css";
import { fetchCategoryProducts } from "../../services/furnitureService"; 

function Category() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("cart");
  const { cart, wishlist, placeOrder } = useContext(StoreContext);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchCategoryProducts(categoryId);
      setProducts(data);
    }
    loadProducts();
  }, [categoryId]);

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) navigate("/confirmOrder");
  };

  return (
    <div className={styles.categoryPage}>
      <div className={styles.layout}>
        <div
          className={`${styles.products} ${
            cart.length > 0 || wishlist.length > 0 ? styles.three : styles.four
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

        {(cart.length > 0 || wishlist.length > 0) && (
          <div className={styles.sidePanel}>
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

















