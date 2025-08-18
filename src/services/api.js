import { API } from '../constants';

export async function fetchRestaurants() {
  const res = await fetch('https://nijin-server.vercel.app/api/dinedash/restaurants');
  const data = await res.json();
  // No stripping of isCertified here
  return Array.isArray(data) ? data : data.data;
}
export async function fetchGallery(){
  const res = await fetch(API.GALLERY);
  if(!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}