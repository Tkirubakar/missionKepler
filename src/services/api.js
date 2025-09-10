import { API } from "../constants";

export async function fetchRestaurants() {
  try {
    const response = await fetch(API.RESTAURANTS);
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.status}`);
    }

    const restaurantResponse = await response.json();
    return Array.isArray(restaurantResponse)
      ? restaurantResponse
      : restaurantResponse.data || [];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
}

export async function fetchGallery() {
  try {
    const response = await fetch(API.GALLERY);
    if (!response.ok) {
      throw new Error(`Failed to fetch gallery: ${response.status}`);
    }

    const galleryResponse = await response.json();
    return Array.isArray(galleryResponse)
      ? galleryResponse
      : galleryResponse.data || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
}