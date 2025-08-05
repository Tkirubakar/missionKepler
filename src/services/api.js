export const fetchPlaces = async () => {
  const response = await fetch('https://nijin-server.vercel.app/api/explorer');
  return response.json();
};

export const fetchPlaceById = async (id) => {
  const res = await fetch(`https://nijin-server.vercel.app/api/explorer/places/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch place: ${res.status}`);
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON returned for place ID: ' + id);
  }
};