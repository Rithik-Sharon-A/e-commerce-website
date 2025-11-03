import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/user';

interface LoginCredentials {
  email: string;
  password: string;
}

// Mock login - replace with actual API later
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock successful login
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: credentials.email,
      token: 'mock-jwt-token-123'
    };
    
    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return null;
  }
);

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  }
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;


