import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../context/StoreContext";
import { RiShieldCheckFill } from "react-icons/ri";
import styles from "./ProductCard.module.css";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button/Button";
import Image from "../common/Image/Image";
import Divider from "../common/Divider/Divider";

function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const { addToCart, addToWishlist } = useContext(StoreContext);

  const handleAddToCart = () => {
    addToCart(product);
    if (onAddToCart) onAddToCart();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    if (onAddToWishlist) onAddToWishlist();
  };

  return (
    <div className={styles.card}>
      <Image src={product.image} alt={product.title} className={styles.image} />

      <div className={styles.titlePrice}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
      </div>

      <p className={styles.desc}>{product.description}</p>
      <p className={styles.guarantee}>
        <RiShieldCheckFill className={styles.icon} /> {product.guarantee}
      </p>

      <Divider className={styles.line} />

      <div className={styles.actions}>
        <Button className={styles.wishlist} onClick={handleAddToWishlist}>
          Add to Wishlist
        </Button>
        <Button className={styles.addToCart} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    guarantee: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
};

export default ProductCard;