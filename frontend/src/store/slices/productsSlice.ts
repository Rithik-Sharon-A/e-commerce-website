import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types/product';

// Mock API call - replace with actual API later
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock data
    const products: Product[] = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones',
        price: 299.99,
        image: 'https://via.placeholder.com/300',
        category: 'Electronics',
        stock: 50,
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Fitness tracking smart watch',
        price: 199.99,
        image: 'https://via.placeholder.com/300',
        category: 'Electronics',
        stock: 30,
        rating: 4.3,
        reviews: 95
      },
      {
        id: 3,
        name: 'Running Shoes',
        description: 'Comfortable running shoes',
        price: 89.99,
        image: 'https://via.placeholder.com/300',
        category: 'Fashion',
        stock: 100,
        rating: 4.7,
        reviews: 256
      }
    ];
    
    return products;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data - in real app, fetch from API
    const product: Product = {
      id,
      name: 'Product ' + id,
      description: 'Detailed product description',
      price: 99.99,
      image: 'https://via.placeholder.com/300',
      category: 'Category',
      stock: 25,
      rating: 4.5,
      reviews: 50
    };
    
    return product;
  }
);

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  }
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;


