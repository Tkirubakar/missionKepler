import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={isHome ? styles.homeHeader : styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>DineDash</div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            HOME
          </NavLink>
          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              isActive || location.pathname.startsWith("/restaurant/")
                ? styles.active
                : ""
            }
          >
            RESTAURANTS
          </NavLink>
          <NavLink
            to="/reserve"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            RESERVE A TABLE
          </NavLink>
        </nav>
      </div>
    </header>
  );
}