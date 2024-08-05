const API_BASE_URL = 'https://fakestoreapi.com';

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  CATEGORIES: `${API_BASE_URL}/products/categories`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `${API_BASE_URL}/products/category/${category}`,
 
  USER_PROFILE: (id) => `${API_BASE_URL}/users/${id}`,
};

export const APP_CONFIG = {
  FEATURED_PRODUCTS_LIMIT: 4,
  // Add other app-wide configuration variables here
};