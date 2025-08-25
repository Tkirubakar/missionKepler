import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { fetchGallery } from '../../services/api';
import Loader from '../../components/Loader/Loader';

export default function Home(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    fetchGallery()
      .then(data => { 
        if (mounted) {
          const galleryArray = Array.isArray(data) ? data : (data.data || []);
          setItems(galleryArray);
          setLoading(false);
        }
      })
      .catch(e => { 
        if (mounted) {
          setError(e.message); 
          setLoading(false);
        }
      });
    return ()=> mounted=false;
  },[]);

  if(loading) return <Loader/>;
  if(error) return <div style={{padding:20}}>Failed to load gallery: {error}</div>;

  // Automatically detect the right image field and fallback if needed
  const mapped = (items || []).map(it => ({
    image: it.image || it.imageSrc || it.imageUrl || it.url || it.src || 'https://via.placeholder.com/800x400?text=No+Image',
    title: it.title || it.caption || '',
    description: it.description || it.subTitle || ''
  }));

  console.log('Mapped for carousel:', mapped);

  return (
    <div>
      <Carousel items={mapped} interval={3000}/>
    </div>
  );
}
