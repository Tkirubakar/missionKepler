import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { StoreProvider } from "./context/StoreContext";
import styles from "../src/App.module.css";

function App() {
  return (
    <StoreProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:categoryId" element={<Category />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;