// ✅ src/services/furnitureService.js

/**
 * Fetch category products by ID
 * Supports both API fetch and local JSON fallback.
 */
export async function fetchCategoryProducts(categoryId) {
  try {
    // Attempt remote API (optional)
    const response = await fetch(
      `https://jsonmockserver.vercel.app/api/shopping/furniture/products?category=${categoryId}`
    );

    if (!response.ok) {
      throw new Error("API fetch failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Using local JSON fallback:", error.message);

    // Local fallback
    const local = await import("../data/furniture.json");
    return local.products[categoryId] || [];
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://jsonmockserver.vercel.app/api/shopping/furniture/categories"
    );
    if (!response.ok) throw new Error("API fetch failed");

    return await response.json();
  } catch (error) {
    console.warn("Using local JSON fallback:", error.message);

    const local = await import("../data/furniture.json");
    return local.categories || [];
  }
}
