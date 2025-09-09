import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { fetchGallery } from "../../services/api";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then((galleryData) => {
      const galleryArray = Array.isArray(galleryData)
        ? galleryData
        : galleryData?.data || [];
      setItems(galleryArray);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  // Normalize gallery items to match carousel
  const mappedItems = (items || []).map((galleryItem) => ({
    image:
      galleryItem.image ||
      galleryItem.imageSrc ||
      galleryItem.imageUrl ||
      galleryItem.url ||
      galleryItem.src ||
      "https://via.placeholder.com/800x400?text=No+Image",
    title: galleryItem.title || galleryItem.caption || "",
    description: galleryItem.description || galleryItem.subTitle || "",
  }));

  console.log("Mapped for carousel:", mappedItems);

  return (
    <div>
      <Carousel items={mappedItems} interval={3000} />
    </div>
  );
}