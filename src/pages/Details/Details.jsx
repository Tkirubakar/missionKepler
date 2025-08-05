import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import Header from '../../components/Header/Header';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import ContactForm from '../../components/ContactForm/ContactForm';
import { fetchPlaceById, fetchPlaces } from '../../services/api';
import { truncateText } from '../../utils/truncateText';

const Details = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStaticImage = (city) => {
    if (!city || typeof city !== 'string') return '/images/default.png';
    return `/images/${city.toLowerCase().replace(/\s+/g, '-')}.png`;
  };

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const data = await fetchPlaceById(id);
        setPlace(data);
      } catch (error) {
        console.error('Error loading place:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadRelated = async () => {
      try {
        const allPlaces = await fetchPlaces();
        const filtered = allPlaces
          .filter((p) => p.city.toLowerCase() !== id.toLowerCase())
          .slice(0, 3)
          .map((p) => ({
            ...p,
            image: getStaticImage(p.city),
          }));

        setRelated(filtered);
      } catch (error) {
        console.error('Error loading related places:', error);
      }
    };

    loadPlace();
    loadRelated();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!place) return <div className={styles.loading}>Place not found.</div>;

  return (
    <div>
      <Header />
      <div className={styles.heroSection}>
        <div className={styles.leftContent}>
          <h1 className={styles.cityName}>{place.city}</h1>
          <div className={styles.placeBox}>
            <h2>{place.place}</h2>
          </div>
          <p className={styles.temp}>32&deg;C</p>
        </div>
        <div className={styles.rightImage}>
          <img src={`/images/${place.city.toLowerCase().replace(/\s+/g, '-')}.png`} alt={place.city} />
        </div>
      </div>
      <div className={styles.detailDescription}>
        <p>{place.fullDescription}</p>
      </div>

      <div className={styles.related}>
        <h2>Similar Destination</h2>
        <p className={styles.descriptionText}>Because you liked {place.city}</p>
        <div className={styles.cards}>
          {related.map((p, index) => (
            <DestinationCard
              key={index}
              name={p.place}
              city={p.city}
              image={p.image}
              description={truncateText(p.shortDescription || p.description)}
            />
          ))}
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default Details;
