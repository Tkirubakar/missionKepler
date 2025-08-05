import React, { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';
import { fetchPlaces } from '../../services/api';
import SuccessBanner from '../SuccessBanner/SuccessBanner';
import TextInput from '../Form/TextInput';
import SelectInput from '../Form/SelectInput';

const ContactForm = () => {
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    hometown: '',
    destination: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    fetchPlaces().then(setPlaces);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setSubmitted(true);
    setFormData({ name: '', hometown: '', destination: '', phone: '' });
  };

  const cityList = places.map((place) => place.city);

  return (
    <section className={styles.contactSection}>
      <div className={styles.innnerContactSection}>
        <h2>Contact Us</h2>
        <p className={styles.headingDescription}>
          Our Sales Team will reach out to you ASAP
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <SelectInput
            label="Your Home Town"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
            options={cityList}
          />
          <SelectInput
            label="Where would you like to go?"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            options={cityList}
          />
          <TextInput
            label="Contact Number"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <button type="submit">Submit Interest</button>
        </form>
      </div>
      {submitted && submittedData && <SuccessBanner data={submittedData} />}
    </section>
  );
};

export default ContactForm;