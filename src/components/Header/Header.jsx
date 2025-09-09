import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { path: "/", label: "HOME", exact: true },
    { path: "/restaurants", label: "RESTAURANTS", includeSubPaths: true },
    { path: "/reserve", label: "RESERVE A TABLE" },
  ];

  return (
    <header className={isHome ? styles.homeHeader : styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>DineDash</div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                if (item.includeSubPaths) {
                  return location.pathname.startsWith(item.path)
                    ? styles.active
                    : "";
                }
                return isActive ? styles.active : "";
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}