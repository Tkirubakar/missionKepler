import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Explorer Logo"
            className={styles.logo}
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        <span>Hotels</span>
        <span>Bike Rentals</span>
        <span>Restaurants</span>
      </nav>
    </header>
  );
};

export default Header;
