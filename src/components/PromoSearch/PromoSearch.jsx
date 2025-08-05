import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoSearch.module.css';

const PromoSearch = ({ places }) => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleExplore = () => {
    if (selected) {
      const citySlug = selected.toLowerCase().replace(/\s+/g, '-');
      navigate(`/place/${citySlug}`);
    }
  };

  return (
    <section className={styles.promo}>
      <div className={styles.left}>
        <h3>WELCOME TO EXPLORER</h3>
        <h1>
          <span className={styles.line}>Your Adventure</span>
          <span className={styles.line}>Travel Expert in</span>
          <span className={styles.line}>
            <span className={styles.light}>the </span>
            <span className={styles.boldLine}>SOUTH</span>
          </span>
        </h1>

        <div className={styles.dropdownContainer}>
          <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Choose</option>
            {places.map((p, idx) => (
              <option key={idx} value={p.city}>
                {p.city}
              </option>
            ))}
          </select>

          <button onClick={handleExplore}>EXPLORE</button>
        </div>
      </div>

      <div className={styles.right}>
        <img src="/images/banner.jpg" alt="Promo" className={styles.image} />
      </div>
    </section>
  );
};

export default PromoSearch;
