import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchProductsByCategory, setSearchTerm } from '../../redux/productSlice';
import Spinner from '../../components/Spinner';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, categories, status, error, searchTerm } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
  };

  const handleClick = (productId) => {
    navigate(`/dashboard/products/${productId}`);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'price-low-high':
        return products.slice().sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return products.slice().sort((a, b) => b.price - a.price);
      case 'title-asc':
        return products.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return products.slice().sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const filterProducts = (products) => {
    return products.filter(product => 
      (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  

  if (status === 'loading') return <Spinner />; 
  if (status === 'failed') return <div>Error: {error}</div>;

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="filters">
        
        <div className="category-filter">
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="search-filter">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={localSearchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="sort-filter">
          <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>
      </div>
      <div className="product-list">
        {sortedProducts.map(product => (
          <div 
            className="product-card" 
            key={product.id} 
            onClick={() => handleClick(product.id)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;