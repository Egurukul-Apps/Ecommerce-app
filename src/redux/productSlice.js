import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { STATUS_SUCCEEDED, STATUS_LOADING, STATUS_FAILED } from '../utils/status';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response?.data || 'An error occurred while fetching products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES);
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response?.data || 'An error occurred while fetching categories');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response?.data || 'An error occurred while fetching products by categories');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm,  { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.SEARCH_PRODUCTS(searchTerm));
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response?.data || 'An error occurred while searching for products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, {rejectWithValue}) => {
    try { 
    const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
    return response.data;
  } catch(error) {
    return rejectWithValue(error.response?.data || 'An error occurred while fetching the product');
  }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    categories: [],
    status: 'idle',
    error: null,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter(item =>
        item.name?.toLowerCase().includes(action.payload.toLowerCase()) ||
        item.description?.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS_LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = STATUS_LOADING;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;
