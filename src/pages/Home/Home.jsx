import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import PromoSearch from '../../components/PromoSearch/PromoSearch';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import ContactForm from '../../components/ContactForm/ContactForm';
import { fetchPlaces } from '../../services/api';
import { truncateText } from '../../utils/truncateText';


const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStaticImage = (city) => {
    if (!city || typeof city !== 'string') return '/images/default.png';
    return `/images/${city.toLowerCase().replace(/\s+/g, '-')}.png`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlaces();

        const enriched = data.map((place) => ({
          ...place,
          image: getStaticImage(place.city),
        }));

        setPlaces(enriched);
      } catch (error) {
        console.error('Failed to fetch places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <PromoSearch places={places} />

      <section className={styles.destinationSection}>
        <h2 className={styles.secondaryHeading}> Destinations</h2>
        <p className={styles.description}>Just for you. Because you and your bike are special to us.</p>
        {loading ? (
          <p>Loading...</p>
        ) : places?.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          <div className={styles.cardsWrapper}>
            {places.map((place, index) => (
              <DestinationCard
                key={index}
                name={place.place}
                city={place.city}
                image={place.image}
                description={truncateText(place.shortDescription || place.description, 55)}
              />
            ))}
          </div>
        )}
      </section>


      <ContactForm places={places} />
    </div>
  );
};

export default Home;