import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import ConfirmOrder from "./pages/ConfirmOrder/ConfirmOrder"; // ✅ import new page
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { StoreProvider } from "./context/StoreContext";
import styles from "./App.module.css";

function App() {
  return (
    <StoreProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:categoryId" element={<Category />} />
            <Route path="/confirmOrder" element={<ConfirmOrder />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;