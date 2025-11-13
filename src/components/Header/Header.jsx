import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { path: "/categories/couches", label: "Couches" },
  { path: "/categories/chairs", label: "Chairs" },
  { path: "/categories/dining", label: "Dining" },
];

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="SITBACK Home">
        SITBACK
      </Link>
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.user}>
        <span className={styles.username}>Nijin Vinodan</span>
        <FaCaretDown size={12} className={styles.caretIcon} />
      </div>
    </header>
  );
}

export default Header;
