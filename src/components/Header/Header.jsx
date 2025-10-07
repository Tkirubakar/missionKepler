import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa"
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        SITBACK
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/categories/couches"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Couches
        </NavLink>
        <NavLink
          to="/categories/chairs"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Chairs
        </NavLink>
        <NavLink
          to="/categories/dining"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Dining
        </NavLink>
      </nav>

      <div className={styles.user}>
      Nijin Vinodan <FaCaretDown size={12} />
      </div>
    </header>
  );
}

export default Header;