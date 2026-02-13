import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);


  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            if (qty <= 0) return null;
            return { ...item, quantity: qty };
          }
          return item;
        })
        .filter(Boolean); 
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };


  const moveToCart = (product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const placeOrder = () => {
    if (cart.length === 0) return null;

    const order = {
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart.map((c) => ({ ...c })),
      total: cart.reduce(
        (sum, placeorder) => sum + Number(placeorder.price) * Number(placeorder.quantity || 1),
        0
      ),
    };

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};