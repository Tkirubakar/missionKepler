import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import styles from './Restaurants.module.css';

export default function Restaurants(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted=true;
    fetchRestaurants()
      .then(res => { 
        if(mounted){
          const restaurantsArray = Array.isArray(res) ? res : (res.data || []);
          setData(restaurantsArray);
          setLoading(false);
        }
      })
      .catch(e => { 
        if(mounted){
          setError(e.message);
          setLoading(false);
        }
      });
    return ()=> mounted=false;
  },[]);

  if(loading) return <Loader/>;
  if(error) return <div style={{padding:20}}>Failed to load restaurants: {error}</div>;
  console.log(fetchRestaurants)
  return (
    <div>
      <div className="pageBackground">
        <div className="pageBackgroundInner">
          <div className={styles.grid}>
            {(data || []).map(r => (
              <RestaurantCard key={r.id} restaurant={{
                ...r,
                image: r.image || r.thumbnail || 'https://via.placeholder.com/300x200',
                isVeg: r.veg || false,
                isCertified: r.isCertified ?? r.is_certified ?? false,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}