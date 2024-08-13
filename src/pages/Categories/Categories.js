import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/productSlice';
import Spinner from '../../components/Spinner';
import './Categories.css';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />; 
  if (status === 'failed') return <div>Error: {error}</div>; 

  return (
    <div className="categories-page">
      <h2>Product Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <Link 
            to={`/dashboard/products?category=${category}`} 
            key={category} 
            className="category-card"
          >
            <h3>{category}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
